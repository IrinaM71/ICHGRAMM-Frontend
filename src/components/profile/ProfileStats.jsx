import styles from "./ProfileStats.module.css";

export default function ProfileStats({ posts, followers, following }) {
  return (
    <div className={styles.statsProfile}>
      <p>
        <strong>{posts}</strong> posts
      </p>
      <p>
        <strong>{followers}</strong> followers
      </p>
      <p>
        <strong>{following}</strong> following
      </p>
    </div>
  );
}
