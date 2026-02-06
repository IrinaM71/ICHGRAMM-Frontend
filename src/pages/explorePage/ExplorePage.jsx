import styles from "./styles.module.css";
import { useExploreStore } from "../../store";
import { useEffect } from "react";

function ExplorePage() {
  const { photos, loading, error, fetchUserPhotos } = useExploreStore();

  useEffect(() => {
    fetchUserPhotos();
  }, [fetchUserPhotos]);

  const safePhotos = photos || [];

  return (
    <div className={styles.explore}>
      <div className={styles.container}>
        {loading && <p className={styles.loading}>Loading photos...</p>}
        {error && <p className={styles.error}></p>}

        {!loading && !error && safePhotos.length === 0 && (
          <p className={styles.empty}>No photos yet</p>
        )}

        {!loading &&
          !error &&
          safePhotos.length > 0 &&
          safePhotos.map((photo) => (
            <img
              key={photo.id}
              src={photo.url}
              alt="user content"
              className={styles.photo}
            />
          ))}
      </div>
    </div>
  );
}

export default ExplorePage;
