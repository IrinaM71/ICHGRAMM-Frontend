import styles from ",.styles.module. css";
import AuthForm from "../../components/authForm/AuthForm";
import BackgroundBild from "../../assets/images/Background.png";

function AuthPage() {
  return (
    <div className={styles.authPage}>
      <img
        className={styles.authImage}
        src={BackgroundBild}
        alt="screensaver"
      />
      <AuthForm />
    </div>
  );
}

export default AuthPage;
