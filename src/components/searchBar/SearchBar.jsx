import { useState } from "react";
import styles from "./styles.module.css";

function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const text = e.target.value;
    setValue(text);
    onSearch(text);
  };

  return (
    <input
      type="text"
      className={styles.input}
      placeholder="Search"
      value={value}
      onChange={handleChange}
    />
  );
}

export default SearchBar;
