import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import styles from "./styles.module.css";
import Footer from "../components/footer/Footer";
import Menu from "../components/menu/Menu";
import SearchPanel from "../components/searchPanel/SearchPanel";
import { useAuthStore } from "../store";

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
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}

export default AppLayout;
