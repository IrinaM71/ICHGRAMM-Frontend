import { useState, useEffect, useCallback } from "react";
import UserCard from "../../components/userCard/UserCard.jsx";
import styles from "./styles.module.css";

function SearchPage() {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const [recent, setRecent] = useState(() => {
    return JSON.parse(localStorage.getItem("recentSearches") || "[]");
  });

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // Мемоизируем, чтобы ESLint не ругался
  const saveRecent = useCallback(
    (query) => {
      if (!query.trim()) return;

      const updated = [query, ...recent.filter((r) => r !== query)].slice(0, 5);
      setRecent(updated);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
    },
    [recent]
  );

  const fetchResults = useCallback(async (query) => {
    try {
      const res = await fetch(`/search?query=${query}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Search error:", err);
    }
  }, []);

  useEffect(() => {
    const trimmed = value.trim();

    const timer = setTimeout(() => {
      if (!trimmed) {
        setResults([]);
        return;
      }

      fetchResults(trimmed);
      saveRecent(trimmed);
    }, 400);

    return () => clearTimeout(timer);
  }, [value, fetchResults, saveRecent]);

  return (
    <div className={styles.searchPage}>
      <h2 className={styles.searchTitle}>Search</h2>

      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search"
        value={value}
        onChange={handleChange}
      />

      <div className={styles.searchResults}>
        <h4 className={styles.recentTitle}>Recent</h4>

      {value.trim() === "" && recent.length > 0 ? (
        recent.map((item) => (
            <div key={item} className={styles.recentItem} onClick={() => setValue(item)}>
              {item}
            </div>
          ))
        
      
        ) : (
          <p className={styles.noRecent}>No recent searches</p>
        )}
        </div>
      <div className={styles.results}>
        {results.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
