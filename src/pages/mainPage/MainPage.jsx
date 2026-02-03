import styles from "./styles.module.css";
import Menu from "../../components/menu/Menu.jsx";

import PostCard from "../../components/postСard/PostCard.jsx";
import CheckIcon from "../../assets/icons/check.svg";
import { usePostsStore } from "../../store/postsStore.js";
import { useEffect } from "react";

function MainPage() {
  const { posts, loading, error, fetchFeed } = usePostsStore();

  useEffect(() => {
    fetchFeed(); // загружаем ленту при заходе на страницу
  }, [fetchFeed]);

  if (loading) {
    return <div className={styles.loding}>Loading feed...</div>;
  }
  if (error) {
    return <div className={styles.error}>Failed to load posts</div>;
  }

  if (posts?.length === 0) {
    return <p className={styles.empty}>No posts</p>;
  }
  return (
    <div className={styles.main}>
      <Menu />
      <div className={styles.mainGrid}>
        {posts?.map((post) => (
          <PostCard key={post.id} data={post} />
        ))}
      </div>
      <img src={CheckIcon} alt="check" />
      <h2>You've seen all the updates</h2>
      <h4>You have viewed all new publications</h4>
    </div>
  );
}

export default MainPage;
