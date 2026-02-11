import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import styles from "./styles.module.css";
import Footer from "../components/footer/Footer.jsx";
import Menu from "../components/menu/Menu.jsx";
import SearchPanel from "../components/searchPanel/SearchPanel.jsx";
import { useAuthStore } from "../store";
import AddPost from "../components/addPost/AddPost.jsx";

function AppLayout() {
  const fetchMe = useAuthStore((state) => state.fetchMe);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (token) {
      fetchMe();
    }
  }, [token, fetchMe]);

  return (
    <div className={styles.layout}>
      <div className={styles.mainArea}>
        <aside className={styles.sidebar}>
          <Menu />
        </aside>

        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
      <SearchPanel />
      <AddPost />
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}

export default AppLayout;
