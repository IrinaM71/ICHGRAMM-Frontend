import { Link } from "react-router-dom";
import styles from "./styles.module.css";

function NotificationItem({ data }) {
  const { sender, type, createdAt } = data;

  const actionText = {
    like: "liked your post",
    comment: "commented on your post",
    follow: "started following you",
  }[type];

  return (
    <div className={styles.item}>
      <Link to={`/profile/${sender._id}`} className={styles.avatarWrapper}>
        <img
          src={sender.avatar || "/default-avatar.png"}
          alt="avatar"
          className={styles.avatar}
        />
      </Link>

      <div className={styles.info}>
        <Link to={`/profile/${sender._id}`} className={styles.username}>
          {sender.username}
        </Link>

        <p className={styles.action}>{actionText}</p>

        <span className={styles.time}>{formatTimeAgo(createdAt)}</span>
      </div>
    </div>
  );
}

export default NotificationItem;

// helper
function formatTimeAgo(dateString) {
  const diff = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;

  const days = Math.floor(hours / 24);
  return `${days} days ago`;
}
