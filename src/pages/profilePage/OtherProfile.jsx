import styles from "./styles.module.css";
import { useParams } from "react-router-dom";
import { useProfileStore } from "../../store";
import { useEffect, useState } from "react";

function OtherProfile() {
  const { id } = useParams();
  const { profile, loading, error, fetchProfile, updateProfile } =
    useProfileStore();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    fetchProfile(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setBio(profile.bio || "");
      setAvatar(profile?.avatar || "");
    }
  }, [profile]);

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setAvatar(reader.result);
    reader.readAsDataURL(file); // конвертация в Base64
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await updateProfile({
      name,
      bio,
      avatar,
    });

    if (success) {
      alert("Profile updated");
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.profile}>
      <h2>Profile</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <img
          src={avatar || "/default-avatar.png"}
          alt="avatar"
          className={styles.avatar}
        />

        <input type="file" accept="image/*" onChange={handleAvatarUpload} />

        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Your bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <button type="submit">Save changes</button>
      </form>
    </div>
  );
}

export default OtherProfile;
