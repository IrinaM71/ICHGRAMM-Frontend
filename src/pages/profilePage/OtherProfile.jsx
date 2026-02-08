import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileHeader from "../../components/profile/ProfileHeader.jsx";
import styles from "./styles.module.css";
import { api } from "../../utils/api.js";

function OtherProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(false);

  //  Проверка id до эффекта, но без return
  const invalidId = !id;

  useEffect(() => {
    if (invalidId) return;

    async function load() {
      try {
        const res = await api.get(`/users/${id}`);
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to load profile:", err);
        setError(true);
      }
    }

    load();
  }, [id, invalidId]);

  //  Теперь можно делать return
  if (invalidId || error) {
    return <Navigate to="/profile/me" replace />;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.page}>
      <ProfileHeader
        avatar={profile.avatar}
        username={profile.username}
        about={profile.about}
        website={profile.website}
        posts={profile.postsCount}
        followers={profile.followersCount}
        following={profile.followingCount}
        isMe={false}
      />

      <div className={styles.gridContainer}>
        {/* Посты другого пользователя */}
      </div>
    </div>
  );
}

export default OtherProfile;
