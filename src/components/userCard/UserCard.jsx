import { Link } from "react-router-dom";
import styles from "./styles.module.css";

function UserCard({ user }) {
  return (
    <Link to={`/profile/${user._id}`} className={styles.card}>
      <img
        src={user.avatar || "/default-avatar.png"}
        alt="avatar"
        className={styles.avatar}
      />

      <div className={styles.infoCard}>
        <p className={styles.cardname}>{user.username}</p>
        <p className={styles.cardName}>{user.fullName}</p>
      </div>
    </Link>
  );
}

export default UserCard;
