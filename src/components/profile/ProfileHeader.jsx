import Avatar from "./Avatar.jsx";
import ProfileStats from "./ProfileStats.jsx";
import styles from "./ProfileHeader.module.css";
import { Link } from "react-router-dom";

export default function ProfileHeader({
  avatar,
  username,
  about,
  website,
  posts,
  followers,
  following,
  isMe,
}) {
  return (
    <div className={styles.headerProfile}>
      <Avatar src={avatar} alt={username} size={100} />
      <div className={styles.info}>
        <div className={styles.topRow}>
          <h2>{username}</h2>

          {isMe ? (
            <Link to="/profile/edit" className={styles.editBtn}>
              Edit profile
            </Link>
          ) : (
            <button className={styles.followBtn}>Follow</button>
          )}
        </div>

        <ProfileStats
          posts={posts}
          followers={followers}
          following={following}
        />

        {about ? (
          <p className={styles.about}>{about}</p>
        ) : (
          <p className={styles.placeholder}>No bio yet</p>
        )}

        {website ? (
          <a href={website} target="_blank" rel="noopener noreferrer">
            {website}
          </a>
        ) : (
          <p className={styles.placeholder}>No website</p>
        )}
      </div>
    </div>
  );
}
