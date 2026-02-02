import styles from "./styles.module.css";
import Menu from "../../components/menu/Menu";
import Footer from "../../components/footer/Footer";
import { useExploreStore } from "../../store/exploreStore";
import { useEffect } from "react";

function ExplorePage() {
  const { photos, loading, error, fetchUserPhotos } = useExploreStore();

  useEffect(() => {
    fetchUserPhotos();
  }, [fetchUserPhotos]);

  return (
    <div className={styles.explore}>
      <Menu />
      <div className={styles.container}>
        {loading && <p className={styles.loading}>Loading photos...</p>}
        {error && <p className={styles.error}></p>}

        {!loading && !error && photos.length === 0 && (
          <p className={styles.empty}>No photos yet</p>
        )}

        {!loading &&
          !error &&
          photos.length > 0 &&
          photos.map((photo) => (
            <img
              key={photo.id}
              src={photo.url}
              alt="user content"
              className={styles.photo}
            />
          ))}
      </div>
      <Footer />
    </div>
  );
}

export default ExplorePage;
