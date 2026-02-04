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
    <div className={styles.resetContainer}>
      <form className={styles.resetForm} onSubmit={onSubmit}>
        <img className={styles.resetImage} src={Lock} alt="Lock icon" />
        <h3 className={styles.resetTitle}>Trouble logging in?</h3>
        <p className={styles.resetPar}>
          Enter your email, phone, or username and we'll
          <br />
          send you a link to get back into your account.
        </p>
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

        <fieldset className={styles.resetFieldset}>
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
      <div className={styles.backToLogin}>
        <Link to="/login">Back to login</Link>
      </div>
    </div>
  );
}

export default AuthReset;
