import styles from "./styles.module.css";
import LinkIcon from "../../assets/icons/ICHgram.svg";

import { Link, useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();

  // страницы, где футер не нужен
  const higgenRoutes = ["/auth", "/authForm", "/authReset"];

  if (higgenRoutes.includes(location.pathname)) {
    return null;
  }

  const isActive = (path) => location.pathname === path;

  return (
    <div className={styles.footer}>
      <p className={styles.footerLink}>
        <Link to="/" className={isActive("/") ? styles.active : ""}>
          Home
        </Link>
        <Link to="/search" className={isActive("/") ? styles.active : ""}>
          Search
        </Link>
        <Link to="/explore" className={isActive("/") ? styles.active : ""}>
          Explore
        </Link>
        <Link to="/messages" className={isActive("/") ? styles.active : ""}>
          Messages
        </Link>
        <Link
          to="/notifications"
          className={isActive("/") ? styles.active : ""}
        >
          Notifications
        </Link>
        <Link to="/create" className={isActive("/") ? styles.active : ""}>
          Create
        </Link>
      </p>
      <a className={styles.footerA} href="">
        <img src={LinkIcon} alt="ICHgramm" />
      </a>
    </div>
  );
}

export default Footer;
