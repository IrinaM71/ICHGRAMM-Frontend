import { useState } from "react";
import { useAddPostStore } from "../../store";
import styles from "./styles.module.css";
import cloudIcon from "../../assets/icons/cloud.svg";

function AddPost() {
  const { isOpen, close } = useAddPostStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  if (!isOpen) return null;

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const handleShare = () => {
    // Здесь ты отправляешь пост на сервер
    console.log({ title, description, image });

    close();
    setTitle("");
    setDescription("");
    setImage(null);
  };

  return (
    <div className={styles.overlay} onClick={close}>
      <div className={styles.addPostHeader}>
        <div className={styles.addPost} onClick={(e) => e.stopPropagation()}>
          <h2 className={styles.addPostTitle}>Create new post</h2>

          <button
            className={styles.shareButton}
            disabled={!title || !description || !image}
            onClick={handleShare}
          >
            Share
          </button>
        </div>
        <div className={styles.addPostContent}>
          <label className={styles.imageUpload}>
            {image ? (
              <img src={image} alt="preview" />
            ) : (
              <div className={styles.placeholder}>
                <img
                  className={styles.cloudIcon}
                  src={cloudIcon}
                  alt="cloud upload"
                />
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleImage} />
          </label>

          <div className={styles.imageData}>
            <input
              type="text"
              placeholder="Post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
