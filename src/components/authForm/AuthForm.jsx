import styles from "./styles.module.css";
import Logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useState } from "react";

function AuthForm() {
  const navigate = useNavigate();
  const { loginUser, loading, error } = useAuthStore();

  const [identifier, setIdentifier] = useState(""); // email or username
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLocalError(""); //очищаем старую ошибку

    const success = await loginUser(identifier, password);
    if (!success) {
      setLocalError("Invalid username/email or password");
      return;
    }
    navigate("/");
  };

  return (
    <>
      <form className={styles.authForm} onSubmit={onSubmit}>
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

        <button className={styles.formInput} type="submit" disabled={loading}>
          Log in
        </button>
        {error && <p className={styles.error}>{error}</p>}

        <fieldset>
          <legend>OR</legend>
          <p className={styles.authPar} onClick={() => navigate("/authReset")}>
            Forgot password?
          </p>
        </fieldset>
      </form>

      <div className={styles.authSing_ap}>
        <p className={styles.authError}>{localError && localError}</p>
        <h3>Don't have an account?</h3>
        <Link to="/signup">Sign up</Link>
      </div>
    </>
  );
}

export default AuthForm;
