import React, { useState, useEffect, useRef, useCallback } from "react";
import BellIcon from "../BellIcon";
import NotificationDropdown from "./NotificationDropdown";
import styles from "./Notifications.module.css";

interface Notification {
  id: string;
  templateIdentifier: string;
  channel: string;
  content: string;
  createdAt: string;
  seen: boolean;
  read: boolean;
  transactionId: string;
  payload: { text: string };
}

export const Notifications: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchNotifications = useCallback(async () => {
    try {
      // Cancel any ongoing request before making a new one
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      setError(null);
      const response = await fetch(
        "https://novu-notifications-seven.vercel.app/users/1/notifications",
        {
          method: "GET",
          signal: abortControllerRef.current.signal,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const data: {
        data: Notification[];
        hasMore: boolean;
        page: number;
        pageSize: number;
        totalCount: number;
      } = await response.json();

      // Only update if the notifications have changed
      setNotifications((prevNotifications) => {
        const hasChanged = data.data.some((newNotif, index) => {
          const oldNotif = prevNotifications[index];
          return (
            !oldNotif ||
            oldNotif.id !== newNotif.id ||
            oldNotif.read !== newNotif.read
          );
        });
        return hasChanged ? data.data : prevNotifications;
      });
    } catch (err) {
      // Only set error if it's not an abort error
      if (!(err instanceof Error && err.name === "AbortError")) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch notifications"
        );
      }
    }
  }, []);

  const handleNotificationRead = useCallback(async (id: string) => {
    try {
      const response = await fetch(
        `https://novu-notifications-seven.vercel.app/users/1/notifications/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark notification as read");
      }

      // Update the local state immediately for better UX
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === id
            ? { ...notification, read: true }
            : notification
        )
      );

      // Fetch the latest notifications to ensure sync with server
      await fetchNotifications();
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  }, [fetchNotifications]);

  useEffect(() => {
    // Initial fetch
    setLoading(true);
    fetchNotifications().finally(() => setLoading(false));

    // Set up periodic fetching
    intervalRef.current = setInterval(fetchNotifications, 2000);

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchNotifications]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className={styles.container} ref={containerRef}>
      <BellIcon unreadCount={unreadCount} onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <NotificationDropdown
          notifications={notifications}
          loading={loading}
          error={error}
          onNotificationRead={handleNotificationRead}
        />
      )}
    </div>
  );
};

export default Notifications;
