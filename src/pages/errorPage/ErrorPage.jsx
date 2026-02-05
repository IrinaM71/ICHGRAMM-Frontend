import styles from "./styles.module.css";
import Background from "../../assets/images/Background.png";

function ErrorPage() {
  <div className={styles.container}>
    <img className={styles.backImag} src={Background} alt="Application logo" />
    <div className={styles.errorText}>
      <h2 className={styles.errorH2}>Oops! Page Not Found (404 Error)</h2>
      <p className={styles.errorP}>
        We're sorry, but the page you're looking for doesn't seem to exist. If
        you typed the URL manually, please double-check the spelling. If you
        clicked on a link, it may be outdated or broken.
      </p>
    </div>
  </div>;
}

export default ErrorPage;
