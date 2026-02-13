import styles from "./styles.module.css";
import { useEffect } from "react";
import { usePostsStore } from "../../store";

function ExplorePage() {
  const posts = usePostsStore((state) => state.posts);
  const fetchFeed = usePostsStore((state) => state.fetchFeed);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className={styles.exploreGrid}>
      {posts?.map((post) => (
        <img
          key={post._id}
          src={`http://localhost:5000${post.image}`}
          className={styles.photo}
        />
      ))}
    </div>
  );
}

export default ExplorePage;
