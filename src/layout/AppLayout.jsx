import { Outlet } from "react-router-dom";
import styles from "./styles.module.css";
import Menu from "../components/menu/Menu";
import Footer from "../components/footer/Footer";

function AppLayout() {
  return (
    <div className={styles.layoutForm}>
      <div className={styles.appLayout}>
        <Menu />

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
