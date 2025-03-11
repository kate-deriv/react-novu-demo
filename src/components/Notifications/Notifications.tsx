import React, { useState, useEffect, useRef } from "react";
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

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          "https://novu-notifications-seven.vercel.app/users/1/notifications",
          { method: "GET" }
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
        setNotifications(data.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch notifications"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

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
        />
      )}
    </div>
  );
};

export default Notifications;
