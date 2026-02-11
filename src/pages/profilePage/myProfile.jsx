import { useAuthStore } from "../../store";
import { usePostsStore } from "../../store";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "../../components/profile/ProfileHeader";
import styles from "./styles.module.css";

function MyProfile() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const posts = usePostsStore((state) => state.posts);

  const myPosts = posts.filter((p) => p.author === user._id);

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
        {myPosts.map((post) => (
          <img
            key={post._id}
            src={`http://localhost:5000${post.image}`}
            className={styles.gridItem}
          />
        ))}
      </div>
    </div>
  );
}
export default MyProfile;
