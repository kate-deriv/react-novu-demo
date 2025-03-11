import React, { useState, useEffect, useRef } from "react";
import styles from "./Notifications.module.css";

interface Notification {
  id: string;
  templateIdentifier: string;
  channel: string;
  event: string;
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
  console.log(notifications);
  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.bell} onClick={() => setIsOpen(!isOpen)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.header}>Notifications</div>
          <div className={styles.list}>
            {loading && (
              <div className={styles.loading}>Loading notifications...</div>
            )}

            {error && <div className={styles.error}>{error}</div>}

            {!loading && !error && notifications.length === 0 && (
              <div className={styles.empty}>No notifications</div>
            )}

            {!loading &&
              !error &&
              notifications.map((notification) => (
                <div key={notification.id} className={styles.notification}>
                  <div className={styles.title}>{notification.createdAt}</div>
                  <div className={styles.message}>
                    {notification.payload.text}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
