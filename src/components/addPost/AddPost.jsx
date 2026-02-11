import { useState, useRef } from "react";
import { useAddPostStore, useProfileStore } from "../../store";
import { useAuthStore } from "../../store";
import { usePostsStore } from "../../store";
import styles from "./styles.module.css";
import cloudIcon from "../../assets/icons/cloud.svg";
import Avatar from "../../components/profile/Avatar.jsx";

function AddPost() {
  const { isOpen, close } = useAddPostStore();
  const user = useAuthStore((state) => state.user);
  const addPost = usePostsStore((state) => state.addPost);
  const fetchProfile = useProfileStore((state) => state.fetchProfile);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // preview
  const [file, setFile] = useState(null); // actual file

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleImage = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setImage(URL.createObjectURL(selected));
    }
  };

  const handleShare = async () => {
    try {
      if (!file) {
        alert("Please select an image");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", file);

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/posts/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error creating post");
        return;
      }

      console.log("Post created:", data);
      addPost(data);
      fetchProfile(user._id);

      setTitle("");
      setDescription("");
      setImage(null);
      setFile(null);

      close();
    } catch (error) {
      console.error("Share error:", error);
    }
  };

  return (
    <div className={styles.overlay} onClick={close}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.addPostHeader}>
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
          <div className={styles.imageUpload}>
            {image ? (
              <img src={image} alt="preview" className={styles.previewImage} />
            ) : (
              <div className={styles.placeholder} onClick={triggerFileSelect}>
                <img className={styles.cloudIcon} src={cloudIcon} alt="cloud" />
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImage}
              style={{ display: "none" }}
            />
          </div>

          <div className={styles.textFields}>
            <div className={styles.imageData}>
              <div className={styles.userInfo}>
                <Avatar src={user?.avatar} size={40} />
                <span>{user?.username}</span>
              </div>

              <input
                className={styles.createTitle}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                className={styles.description}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
