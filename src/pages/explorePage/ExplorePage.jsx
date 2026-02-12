import styles from "./styles.module.css";
import { useEffect } from "react";
import { useExploreStore } from "../../store/exploreStore";

function ExplorePage() {
  const { posts, fetchAllPosts } = useExploreStore();
  console.log("EXPLORE POSTS:", posts);
  console.log("PAGE STORE INSTANCE:", useExploreStore.getState());

  useEffect(() => {
    fetchAllPosts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.exploreGrig}>
      {posts?.map((post) => (
        <img
          key={post._id}
          src={`http://localhost:5000${post.image}`}
          style={{ width: "100%", objectFit: "cover" }}
        />
      ))}
    </div>
  );
}

export default ExplorePage;
