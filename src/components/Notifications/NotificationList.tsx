import React from 'react';
import NotificationItem from './NotificationItem';
import styles from './Notifications.module.css';

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

interface NotificationListProps {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
}

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  loading,
  error,
}) => {
  if (loading) {
    return <div className={styles.loading}>Loading notifications...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (notifications.length === 0) {
    return <div className={styles.empty}>No notifications</div>;
  }

  return (
    <div className={styles.list}>
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          id={notification.id}
          createdAt={notification.createdAt}
          read={notification.read}
          text={notification.payload.text}
        />
      ))}
    </div>
  );
};

export default NotificationList;
