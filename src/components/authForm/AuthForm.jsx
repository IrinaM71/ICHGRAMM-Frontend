import styles from "./styles.module.css";
import Logo from "../../assets/images/logo.png";
import Background from "../../assets/images/Background.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store";
import { useState } from "react";

function AuthForm() {
  const navigate = useNavigate();
  const { loginUser, loading, error } = useAuthStore();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    const success = await loginUser(identifier, password);

    if (!success) {
      setLocalError("Invalid username/email or password");
      return;
    }

    navigate("/");
  };

  return (
    <div className={styles.authFormContainer}>
      <img
        className={styles.backgroundImage}
        src={Background}
        alt="Background"
      />

      <div className={styles.authFormWrapper}>
        <form className={styles.authFormContent} onSubmit={onSubmit}>
          <img className={styles.backImage} src={Logo} alt="Application logo" />

          <input
            className={styles.formInput}
            type="text"
            placeholder="Username or email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />

          <input
            className={styles.formInput}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            className={styles.formButton}
            type="submit"
            disabled={loading}
          >
            Log in
          </button>

          {error && <p className={styles.error}>{error}</p>}
          {localError && <p className={styles.authError}>{localError}</p>}

          <fieldset className={styles.authFieldset}>
            <legend>OR</legend>
            <p
              className={styles.authPar}
              onClick={() => navigate("/authReset")}
              style={{ cursor: "pointer" }}
            >
              Forgot password?
            </p>
          </fieldset>
        </form>

        <div className={styles.authSignUp}>
          <h3>Don't have an account?</h3>
          <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
