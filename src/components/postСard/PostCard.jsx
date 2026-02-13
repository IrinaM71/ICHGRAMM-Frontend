import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store";
import { usePostsStore } from "../../store";
import LikeButton from "../likeButton/LikeButton.jsx";
import Avatar from "../profile/Avatar.jsx";
import MessgeIcon from "../../assets/icons/message.svg";

function PostCard({ post }) {
  const user = useAuthStore((state) => state.user);
  const likePost = usePostsStore((state) => state.likePost);

  if (!post || !post._id) return null;

  const likes = Array.isArray(post.likes) ? post.likes : [];
  const comments = Array.isArray(post.comments) ? post.comments : [];

  const liked = likes.includes(user?._id);

  const handleLike = () => {
    if (user?._id) {
      likePost(post._id, user._id);
    }
  };

  return (
    <div className={styles.postCard}>
      <div className={styles.cardHeader}>
        <Avatar src={post.author?.avatar} size={40} />
        <span>{post.author?.username}</span>
      </div>

      {post.image && (
        <img
          className={styles.cardImage}
          src={`http://localhost:5000${post.image}`}
        />
      )}

      <div className={styles.iconsForm}>
        <LikeButton
          liked={liked}
          likesCount={likes.length}
          onClick={handleLike}
        />
        <img className={styles.mesBtn} src={MessgeIcon} alt="message" />
      </div>

      <p className={styles.postText}>{post.text}</p>

      <div className={styles.postFooter}>
        <Link className={styles.cardA} to={`/post/${post._id}`}>
          View all comments ({comments.length})
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
