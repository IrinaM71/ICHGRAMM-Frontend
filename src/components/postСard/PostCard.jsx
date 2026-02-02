import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import LikeButton from "../likeButton/LikeButton";
import { usePostStore } from "../../slice/postSlice";
import { useAuthStore } from "../../slice/authSlice";

function PostCard({ post }) {
  const { likePost } = usePostStore();
  const { user } = useAuthStore();

  const isLiked = post.likes.includes(user?._id);

  return (
    <div className={styles.postCard}>
      {/* Author */}
      <div className={styles.cardHeader}>
        <img
          src={post.author.avatar || "/default-avatar.png"}
          alt="avatar"
          className={styles.avatar}
        />
        <Link to={`/user/${post.author._id}`} className={styles.username}>
          {post.author.username}
        </Link>
      </div>

      {/* Foto */}
      {post.image && (
        <img src={post.image} alt="post" className={styles.postImage} />
      )}

      {/* Text */}
      <p className={styles.postText}>{post.text}</p>

      {/* Likes */}
      <LikeButton
        liked={isLiked}
        likesCount={post.likes.length}
        onClick={() => likePost(post._id)}
      />

      {/* Comments */}
      <div className={styles.postFooter}>
        <Link to={`/post/${post._id}`}>Comments ({post.comments.length})</Link>
      </div>
    </div>
  );
}

export default PostCard;
