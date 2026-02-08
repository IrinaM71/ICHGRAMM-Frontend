import { useEffect } from "react";
import { useNotificationsStore } from "../../store/index.js";
import NotificationItem from "../../components/notificationItem/NotificationItem.jsx";
import styles from "./styles.module.css";

function NotificationsPage() {
  const { notifications, loading, error, fetchNotifications, markAllAsRead } =
    useNotificationsStore();

  useEffect(() => {
    fetchNotifications();
    markAllAsRead();
  }, [fetchNotifications, markAllAsRead]);

  if (loading) {
    return <div className={styles.loading}>Loading notifications...</div>;
  }

  if (error) {
    return <div className={styles.error}>Failed to load notifications</div>;
  }

  if (notifications.length === 0) {
    return <div className={styles.empty}>No notifications yet</div>;
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Notifications</h2>

      <div className={styles.list}>
        {notifications.map((item) => (
          <NotificationItem key={item._id} data={item} />
        ))}
      </div>
    </div>
  );
}

export default NotificationsPage;
