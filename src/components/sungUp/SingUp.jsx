import { useNavigate } from "react-router";
import styles from "./styles.moule.css";
import Logo from "../../assets/images/logo.png";
import { useState } from "react";
import { useAuthStore } from "../../slice/authSlice";
import { Link } from "react-router";

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
    <nav>
      <form className={styles.singUpForm} onSubmit={onSubmit}>
        <img className={styles.authImage} src={Logo} alt="Application logo" />

        <p>
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
          People who use our service may have uploaded your contact information
          to Instagram. <a href="">Learn More</a>
        </p>

        <p className={styles.sungUpP}>
          By signing up, you agree to our <a href="">Terms</a>,{" "}
          <a href="">Privacy Policy</a>
          and <a href="">Coocies Policy</a>
        </p>

        <button className={styles.formInput} type="submit" disabled={loading}>
          Sing up
        </button>
      </form>

      <div className={styles.loginBox}>
        <h3>Have an account?</h3>
        <Link to="/main">Log in</Link>
      </div>
    </nav>
  );
}

export default SingUp;
