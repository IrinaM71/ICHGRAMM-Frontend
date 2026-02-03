import styles from "./styles.module.css";
import Lock from "../../assets/icons/lock.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../../store";
import { Link } from "react-router-dom";

function AuthReset() {
  const navigate = useNavigate();
  const { resetPassword, loading } = useAuthStore();

  const [identifier, setIdentifier] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const success = await resetPassword(identifier);

    if (!success) {
      setError("User not found");
      return;
    }

    setMessage("Password reset link has been sent to your email");
  };

  return (
    <>
      <form className={styles.resetForm} onSubmit={onSubmit}>
        <img className={styles.resetImage} src={Lock} alt="Lock icon" />

        <input
          className={styles.formInput}
          type="text"
          placeholder="Username or email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />

        {error && <p className={styles.error}>{error}</p>}
        {message && <p className={styles.success}>{message}</p>}

        <button className={styles.resetButton} disabled={loading}>
          Reset your password
        </button>

        <fieldset>
          <legend>OR</legend>

          <p
            className={styles.resetP}
            onClick={() => navigate("/signup")}
            style={{ cursor: "pointer" }}
          >
            Create new account
          </p>
        </fieldset>
      </form>

      <Link to="/login">Back to login</Link>
    </>
  );
}

export default AuthReset;
