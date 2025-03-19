import React from "react";
import styles from "./NotificationFeed.module.css";

type TNotification = {
  archivedAt?: string | null;
  avatar?: string;
  body: string;
  channelType: string;
  createdAt: string;
  data?: Record<string, unknown>;
  id: string;
  isArchived: boolean;
  isRead: boolean;
  primaryAction?: string;
  readAt?: Date;
  redirect?: boolean;
  secondaryAction?: string;
  subject?: string;
  tags?: string[];
  to?: { id: string; subscriberId: string };
};

interface NotificationFeedProps {
  notifications: TNotification[];
  onClose: () => void;
  onNotificationRead: (id: string) => void;
}

export const NotificationFeed: React.FC<NotificationFeedProps> = ({
  notifications,
  onClose,
  onNotificationRead,
}) => {
  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return "just now";
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) {
      return "yesterday";
    }

    if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    }

    return past.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className={styles.feed}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h3>Activity Feed</h3>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      <div className={styles.content}>
        {notifications.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🔔</div>
            <h4>All Clear!</h4>
            <p>You have no new notifications</p>
          </div>
        ) : (
          <div className={styles.timeline}>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`${styles.timelineItem} ${
                  !notification.isRead ? styles.unread : ""
                }`}
                onClick={() => onNotificationRead(notification.id)}
              >
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <div className={styles.timelineHeader}>
                    <time className={styles.timelineTime}>
                      {formatTimeAgo(notification.createdAt)}
                    </time>
                    {!notification.isRead && (
                      <span className={styles.badge}>New</span>
                    )}
                  </div>
                  <div className={styles.timelineBody}>
                    <p>{notification.body}</p>
                    {notification.tags && notification.tags.length > 0 && (
                      <div className={styles.tags}>
                        {notification.tags.map((tag, index) => (
                          <span key={index} className={styles.tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
