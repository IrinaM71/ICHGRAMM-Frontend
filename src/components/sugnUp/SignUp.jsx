import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import Logo from "../../assets/images/logo.png";
import { useState } from "react";
import { useAuthStore } from "../../store";
import { Link } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const { registerUser, loading, error } = useAuthStore();

  const [form, setForm] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
  });

  const [localError, setLocalError] = useState("");

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    // Клиентская валидация
    if (
      !form.username.trim() ||
      !form.fullName.trim() ||
      !form.email.trim() ||
      !form.password.trim()
    ) {
      setLocalError("All fields are required");
      return;
    }

    const success = await registerUser({
      username: form.username.trim(),
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      password: form.password.trim(),
    });

    if (!success) {
      setLocalError(error || "Registration failed");
      return;
    }

    navigate("/main");
  };

  return (
    <div className={styles.signUpWrapper}>
      <form className={styles.signUpContainer} onSubmit={onSubmit}>
        <img className={styles.authImage} src={Logo} alt="Application logo" />

        <p className={styles.sungUpP1}>
          Sign up to see photos and videos
          <br />
          from your friends.
        </p>

        <input
          className={styles.formInput}
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          required
        />
        <input
          className={styles.formInput}
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={onChange}
          required
        />
        <input
          className={styles.formInput}
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={onChange}
          required
        />

        {localError && <p className={styles.signUpError}>{localError}</p>}
        <input
          className={styles.formInput}
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
          required
        />

        <p className={styles.sugnUpP}>
          People who use our service may have uploaded
          <br />
          your contact information to Instagram. <a href="">Learn More</a>
        </p>

        <p className={styles.sugnUpP}>
          By signing up, you agree to our <a href="">Terms, </a>
          <a href="">
            Privacy
            <br />
            Policy
          </a>
          and <a href="">Cookies Policy</a>
        </p>

        <button className={styles.formButton} type="submit" disabled={loading}>
          Sign up
        </button>
      </form>
      <div className={styles.loginBox}>
        <h3 className={styles.loginBoxH}>Have an account?</h3>
        <Link className={styles.loginBoxA} to="/login">
          Log in
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
