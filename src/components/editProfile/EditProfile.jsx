import styles from "./styles.module.css";
import { useState } from "react";
import { useAuthStore } from "../../store";

function Avatar() {
  const { user, updateAvatar } = useAuthStore();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");
  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const onUpload = async () => {
    if (!selectedFile) {
      setError("No file selected");
      return;
    }
    const success = await updateAvatar(selectedFile);
    if (!success) {
      setError("Failed to upload avatar");
    } else {
      setError("");
    }
  };

  return (
    <div className={styles.avatarUploader}>
      <input type="file" accept="image/*" onChange={onFileChange} />
      {error && <p className={styles.error}>{error}</p>}
      {previewUrl && (
        <div className={styles.preview}>
          <p>Preview:</p>
          <img
            src={previewUrl}
            alt="Avatar preview"
            className={styles.previewImage}
          />
          <button onClick={onUpload} className={styles.uploadButton}>
            Upload
          </button>
        </div>
      )}
    </div>
  );
}

export default Avatar;
