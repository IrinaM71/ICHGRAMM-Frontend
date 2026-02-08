import Avatar from "./Avatar.jsx";
import ProfileStats from "./ProfileStats.jsx";
import styles from "./ProfileHeader.module.css";

export default function ProfileHeader({
  avatar,
  username,
  about,
  website,
  posts,
  followers,
  following,
  isMe,
  onEdit,
}) {
  return (
    <div className={styles.header}>
      <Avatar src={avatar} alt={username} size={100} />

      <div className={styles.info}>
        <div className={styles.topRow}>
          <h2>{username}</h2>

          {isMe ? (
            <button onClick={onEdit} className={styles.editBtn}>
              Edit profile
            </button>
          ) : (
            <button className={styles.followBtn}>Follow</button>
          )}
        </div>

        <ProfileStats
          posts={posts}
          followers={followers}
          following={following}
        />

        {about && <p className={styles.about}>{about}</p>}

        {website && (
          <a href={website} target="_blank" rel="noopener noreferrer">
            {website}
          </a>
        )}
      </div>
    </div>
  );
}
