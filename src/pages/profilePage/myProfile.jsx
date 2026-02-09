import { useAuthStore } from "../../store";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "../../components/profile/ProfileHeader";
import styles from "./styles.module.css";

function MyProfile() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  if (!user) return <div>Loading...</div>;

  return (
    <div className={styles.page}>
      <ProfileHeader
        avatar={user.avatar || "/default-avatar.png"}
        username={user.username}
        about={user.about || ""}
        website={user.website || ""}
        posts={user.postsCount ?? 0}
        followers={user.followersCount ?? 0}
        following={user.followingCount ?? 0}
        isMe={true}
        onEdit={() => navigate("/profile/edit")}
      />

      <div className={styles.gridContainer}>
        {/* Здесь будут посты пользователя */}
      </div>
    </div>
  );
}
export default MyProfile;
