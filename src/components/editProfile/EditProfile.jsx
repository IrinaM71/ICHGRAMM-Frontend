import { useState } from "react";
import { useAuthStore } from "../../store";
import Avatar from "../profile/Avatar";
import styles from "./styles.module.css";

function EditProfile() {
  const { user, updateUser } = useAuthStore();

  const [username, setUsername] = useState(user?.username || "");
  const [about, setAbout] = useState(user?.about || "");
  const [website, setWebsite] = useState(user?.website || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [file, setFile] = useState(null);

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleAvatarChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setAvatar(URL.createObjectURL(selected));
  };

  const handleSave = async () => {
    const formData = new FormData();

    // UI → backend mapping
    formData.append("fullName", username);
    formData.append("bio", about);

    if (file) {
      const base64 = await fileToBase64(file);
      formData.append("avatar", base64);
    }

    try {
      await updateUser(formData);
      alert("Profile updated");
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    }
  };

  return (
    <div className={styles.editProfile}>
      <h2 className={styles.editProfileTitle}>Edit Profile</h2>

      <div className={styles.avatarSection}>
        <Avatar src={avatar} alt="User Avatar" size={56} />

        <div className={styles.avatarInfo}>
          <p className={styles.avatarName}>{username}</p>
          <p className={styles.avatarAbout}>{about}</p>
        </div>

        <label className={styles.newPhotoBtn}>
          New photo
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            hidden
          />
        </label>
      </div>

      <label className={styles.labelEditProfile}>Username</label>
      <input
        className={styles.inputEditProfile}
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label className={styles.labelEditProfile}>Website</label>
      <input
        className={styles.inputEditProfile}
        type="text"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
      />

      <label className={styles.labelEditProfile}>About</label>
      <textarea
        className={styles.inputEditProfile}
        value={about}
        onChange={(e) => setAbout(e.target.value)}
      />

      <button className={styles.saveBtn} onClick={handleSave}>
        Save
      </button>
    </div>
  );
}

export default EditProfile;
