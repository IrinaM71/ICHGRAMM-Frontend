import { useSearchStore } from "../../store/searchStore";
import SearchBar from "../../components/searchBar/SearchBar.jsx";
import UserCard from "../../components/userCard/UserCard.jsx";
import styles from "./styles.module.css";

function SearchPage() {
  const { results, loading, error, searchUsers } = useSearchStore();

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Search</h2>

      <SearchBar onSearch={searchUsers} />

      {loading && <div className={styles.loading}>Searching...</div>}
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.list}>
        {results.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>

      {!loading && results.length === 0 && (
        <div className={styles.empty}>No users found</div>
      )}
    </div>
  );
}

export default SearchPage;
