import { useState } from "react";
import { useAuthStore } from "../../store";
import styles from "./styles.module.css";

function AvatarUploader() {
  const { updateAvatar } = useAuthStore();

  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleSelect = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    setError("");
    setFile(f);
    setPreview(URL.createObjectURL(f)); // мгновенное превью без FileReader
  };

  const handleUpload = async () => {
    if (!file) {
      setError("No file selected");
      return;
    }

    const ok = await updateAvatar(file);
    if (!ok) {
      setError("Failed to upload avatar");
      return;
    }
    setError("");
    setPreview(null);
    setFile(null);
  };

  return (
    <div className={styles.uploader}>
      <input type="file" accept="image/*" onChange={handleSelect} />

      {error && <p className={styles.error}>{error}</p>}

      {preview && (
        <div className={styles.preview}>
          <img src={preview} alt="Preview" className={styles.previewImage} />
          <button onClick={handleUpload} className={styles.uploadButton}>
            Upload
          </button>
        </div>
      )}
    </div>
  );
}

export default AvatarUploader;
