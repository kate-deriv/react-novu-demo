import React from 'react';
import { formatRelativeDate } from '../../utils/dateUtils';
import styles from './Notifications.module.css';

interface NotificationItemProps {
  id: string;
  createdAt: string;
  read: boolean;
  text: string;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  id,
  createdAt,
  read,
  text,
}) => {
  return (
    <div
      key={id}
      className={`${styles.notification} ${!read ? styles.unread : ""}`}
    >
      <div className={styles.title}>
        <span>
          {!read && <span className={styles.unreadDot} />}
        </span>
        <span className={styles.date}>
          {formatRelativeDate(createdAt)}
        </span>
      </div>
      <div className={styles.message}>{text}</div>
    </div>
  );
};

export default NotificationItem;
