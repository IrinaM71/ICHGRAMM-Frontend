import { Outlet } from "react-router-dom";
import styles from "./styles.module.css";
import Footer from "../components/footer/Footer";
import Menu from "../components/menu/Menu";

function AppLayout() {
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

      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}

export default AppLayout;
