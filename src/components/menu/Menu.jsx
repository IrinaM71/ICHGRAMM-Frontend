import styles from "./styles.module.css";
import homeIcon from "../../assets/icons/home.svg";
import searchIcon from "../../assets/icons/search.svg";
import exploreIcon from "../../assets/icons/explore.svg";
import messagesIcon from "../../assets/icons/messages.svg";
import notificationsIcon from "../../assets/icons/notifications.svg";
import createchIcon from "../../assets/icons/create.svg";
import Logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store";

function Menu() {
  const navigate = useNavigate();

  // ✔ Правильные селекторы Zustand
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // ✔ Защита от null
  if (!user) {
    return null;
  }

  return (
    <nav className={styles.menu}>
      <img className={styles.menuLogo} src={Logo} alt="Application logo " />

      <Link className={styles.nav} to="/">
        <img className={styles.navImage} src={homeIcon} alt="home" />
        Home
      </Link>

      <Link className={styles.nav} to="/search">
        <img className={styles.navImage} src={searchIcon} alt="search" />
        Search
      </Link>

      <Link className={styles.nav} to="/explore">
        <img className={styles.navImage} src={exploreIcon} alt="explore" />
        Explore
      </Link>

      <Link className={styles.nav} to="/messages">
        <img className={styles.navImage} src={messagesIcon} alt="messages" />
        Messages
      </Link>

      <Link className={styles.nav} to="/notifications">
        <img
          className={styles.navImage}
          src={notificationsIcon}
          alt="notification"
        />
        Notification
      </Link>

      <Link className={styles.nav} to="/create">
        <img className={styles.navImage} src={createchIcon} alt="create" />
        Create
      </Link>

      <Link className={styles.nav} to={`/profile/${user.id}`}>
        <img
          className={styles.navImage}
          src={user.avatar || "/default-avatar.png"}
          alt="profile"
        />
        Profile
      </Link>

      <button className={styles.navButton} onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default Menu;
