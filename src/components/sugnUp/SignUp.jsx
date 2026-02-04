import { useNavigate } from "react-router";
import styles from "./styles.module.css";
import Logo from "../../assets/images/logo.png";
import { useState } from "react";
import { useAuthStore } from "../../store";
import { Link } from "react-router-dom";

function SingUp() {
  const navigate = useNavigate();
  const { registerUser, loading } = useAuthStore();

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

    const success = await registerUser(form);
    if (!success) {
      setLocalError("This username already taken");
      return;
    }
    navigate("/");
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

        {localError && <p className={styles.singUpError}>{localError}</p>}
        <input
          className={styles.formInput}
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
          required
        />

        <p className={styles.sungUpP}>
          People who use our service may have uploaded
          <br />
          your contact information to Instagram. <a href="">Learn More</a>
        </p>

        <p className={styles.sungUpP}>
          By signing up, you agree to our <a href="">Terms, </a>
          <a href="">
            Privacy
            <br />
            Policy
          </a>
          and <a href="">Coocies Policy</a>
        </p>

        <button className={styles.formButton} type="submit" disabled={loading}>
          Sing up
        </button>
      </form>
      <div className={styles.loginBox}>
        <h3 className={styles.loginBoxH}>Have an account?</h3>
        <Link className={styles.loginBoxA} to="/main">
          Log in
        </Link>
      </div>
    </div>
  );
}

export default SingUp;
