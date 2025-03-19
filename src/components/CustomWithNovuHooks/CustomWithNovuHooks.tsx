import { useEffect, useRef, useState } from "react";
import { useCounts, useNotifications } from "@novu/react";
import BellIcon from "../BellIcon";
import styles from "./CustomWithNovuHooks.module.css";
import { NotificationFeed } from "../NotificationFeed";

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

export default function CustomWithNovuHooks() {
  const { notifications } = useNotifications();
  const { counts } = useCounts({ filters: [{ read: false }] });
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const unreadCount = counts?.[0].count ?? 0;

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

  const handleNotificationRead = async (id: string) => {
    try {
      console.log("we read notification", id);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  if (!notifications) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Custom Component with Novu Hooks</h2>
      <div className={styles.notificationsWrapper} ref={containerRef}>
        <BellIcon
          unreadCount={unreadCount}
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <NotificationFeed
            notifications={notifications as unknown as TNotification[]}
            onClose={() => setIsOpen(false)}
            onNotificationRead={handleNotificationRead}
          />
        )}
      </div>
    </div>
  );
}
