import React from 'react';
import NotificationList from './NotificationList';
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

interface NotificationDropdownProps {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notifications,
  loading,
  error,
}) => {
  return (
    <div className={styles.dropdown}>
      <div className={styles.header}>Notifications</div>
      <NotificationList
        notifications={notifications}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default NotificationDropdown;
