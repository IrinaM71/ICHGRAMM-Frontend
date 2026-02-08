import styles from "./Avatar.module.css";

export default function Avatar({ src, alt = "User", size = 80 }) {
  const initials = alt?.[0]?.toUpperCase() || "?";

  return (
    <div className={styles.avatar} style={{ width: size, height: size }}>
      {src ? (
        <img src={src} alt={alt} className={styles.image} />
      ) : (
        <div className={styles.fallback}>{initials}</div>
      )}
    </div>
  );
}
