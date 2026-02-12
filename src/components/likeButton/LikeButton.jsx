import styles from "./styles.module.css";

function LikeButton({ liked, likesCount, onClick }) {
  return (
    <button className={styles.likeBtn} onClick={onClick}>
      <span style={{ color: liked ? "red" : "gray" }}>
        {liked ? "❤️" : "🤍"}
      </span>
      <span className={styles.likeSpan}>{likesCount} likes</span>
    </button>
  );
}
export default LikeButton;
