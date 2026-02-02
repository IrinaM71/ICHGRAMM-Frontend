function LikeButton({ liked, likesCount, onClick }) {
  return (
    <button className="like-btn" onClick={onClick}>
      <span style={{ color: liked ? "red" : "gray" }}>
        {liked ? "❤️" : "🤍"}
      </span>
      <span>{likesCount}</span>
    </button>
  );
}
export default LikeButton;
