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
  // Защита от undefined
  if (!post) return null;

  const likes = post.likes || [];
  const likesCount = likes.length;
  const liked = likes.includes(user._id);
  const handleLike = () => {
    likePost(post._id, user._id);
  };

  return (
    <div className={styles.postCard}>
      {/* Author */}
      <div className={styles.cardHeader}>
        <Avatar src={post.author?.avatar} size={40} />
        <span>{post.author?.username}</span>
      </div>

      {/* Foto */}
      {post.image && (
        <img
          className={styles.cardImage}
          src={`http://localhost:5000${post.image}`}
        />
      )}

      <div className={styles.iconsForm}>
        {/* Likes */}
        <LikeButton
          liked={liked}
          likesCount={likesCount}
          onClick={handleLike}
        />
        <img className={styles.mesBtn} src={MessgeIcon} alt="message" />
      </div>
      {/* Text */}
      <p className={styles.postText}>{post.text}</p>

      {/* Comments */}
      <div className={styles.postFooter}>
        <Link className={styles.cardA} to={`/post/${post._id}`}>
          View all comments ({post.comments.length})
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
