import { useAuthStore } from "../../store";
import ProfileHeader from "../../components/profile/ProfileHeader";
import styles from "./styles.module.css";

function MyProfile() {
  const { user } = useAuthStore();

  if (!user) return <div>Loading...</div>;

  return (
    <div className={styles.page}>
      <ProfileHeader
        avatar={user.avatar}
        username={user.username}
        about={user.about}
        website={user.website}
        posts={user.postsCount}
        followers={user.followersCount}
        following={user.followingCount}
        isMe={true}
        onEdit={() => console.log("Open edit modal")}
      />

      <div className={styles.gridContainer}>
        {/* Здесь будут посты пользователя */}
      </div>
    </div>
  );
}
export default MyProfile;
