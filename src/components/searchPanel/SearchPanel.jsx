import { useSearchStore } from "../../store/searchStore.js";
import SearchPage from "../../pages/searchPage/SearchPage.jsx";
import styles from "./styles.module.css";

function SearchPanel() {
  const { isOpen, close } = useSearchStore();

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.open : ""}`}>
      <div className={styles.panel}>
        <button className={styles.closeBtn} onClick={close}>
          ×
        </button>
        <SearchPage />
      </div>
    </div>
  );
}

export default SearchPanel;
