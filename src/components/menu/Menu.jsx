import styles from "./styles.module.css";
import homeIcon from "../../assets/icons/home.svg";
import searchIcon from "../../assets/icons/search.svg";
import exploreIcon from "../../assets/icons/explore.svg";
import messagesIcon from "../../assets/icons/messages.svg";
import notificationsIcon from "../../assets/icons/notifications.svg";
import createchIcon from "../../assets/icons/create.svg";
import Logo from "../../assets/images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
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

      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? `${styles.nav} ${styles.activeNav}` : styles.nav
        }
      >
        <img className={styles.navImage} src={homeIcon} alt="home" />
        Home
      </NavLink>

      <NavLink
        to="/search"
        className={({ isActive }) =>
          isActive ? `${styles.nav} ${styles.activeNav}` : styles.nav
        }
      >
        <img className={styles.navImage} src={searchIcon} alt="search" />
        Search
      </NavLink>

      <NavLink
        to="/explore"
        className={({ isActive }) =>
          isActive ? `${styles.nav} ${styles.activeNav}` : styles.nav
        }
      >
        <img className={styles.navImage} src={exploreIcon} alt="explore" />
        Explore
      </NavLink>

      <NavLink
        to="/messages"
        className={({ isActive }) =>
          isActive ? `${styles.nav} ${styles.activeNav}` : styles.nav
        }
      >
        <img className={styles.navImage} src={messagesIcon} alt="messages" />
        Messages
      </NavLink>

      <NavLink
        to="/notifications"
        className={({ isActive }) =>
          isActive ? `${styles.nav} ${styles.activeNav}` : styles.nav
        }
      >
        <img
          className={styles.navImage}
          src={notificationsIcon}
          alt="notification"
        />
        Notification
      </NavLink>
      <NavLink
        to="/create"
        className={({ isActive }) =>
          isActive ? `${styles.nav} ${styles.activeNav}` : styles.nav
        }
      >
        <img className={styles.navImage} src={createchIcon} alt="create" />
        Create
      </NavLink>

      <NavLink
        to={`/profile/${user.id}`}
        className={({ isActive }) =>
          isActive ? `${styles.nav} ${styles.activeNav}` : styles.nav
        }
      >
        <img
          className={styles.navImage}
          src={user?.avatar || "/default-avatar.png"}
          alt="profile"
        />
        Profile
      </NavLink>

      <button className={styles.navButton} onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default Menu;
