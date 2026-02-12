import styles from "./styles.module.css";
import PostCard from "../../components/postСard/PostCard.jsx";
import CheckIcon from "../../assets/icons/check.svg";
import { usePostsStore } from "../../store/postsStore.js";
import { useEffect } from "react";

function MainPage() {
  const { posts, loading, error, fetchFeed } = usePostsStore();

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  if (loading) {
    return <div className={styles.loading}>Loading feed...</div>;
  }

  if (error) {
    return <div className={styles.error}>Failed to load posts</div>;
  }

  //  Защита №1 — если posts undefined, превращаем в пустой массив
  const safePosts = posts || [];

  return (
    <div className={styles.main}>
      {safePosts.length === 0 ? (
        <p className={styles.empty}>No posts</p>
      ) : (
        <>
          <div className={styles.mainGrid}>
            {safePosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>

          <div className={styles.endMessage}>
            <img src={CheckIcon} alt="check" />
            <h2>You've seen all the updates</h2>
            <h4>You have viewed all new publications</h4>
          </div>
        </>
      )}
    </div>
  );
}

export default MainPage;
