import styles from "./Avatar.module.css";

export default function Avatar({ src, alt = "User", size = 80 }) {
  const initials = alt?.[0]?.toUpperCase() || "?";
  const fallback = "/default-avatar.png";

  return (
    <div className={styles.avatarProfile} style={{ width: size, height: size }}>
      {src ? (
        <img src={src || fallback} alt={alt} className={styles.imageProfile} />
      ) : (
        <div className={styles.fallback}>{initials}</div>
      )}
    </div>
  );
}
