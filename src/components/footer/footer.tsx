import styles from "./footer.module.css";
import cn from "classnames";
import newsLogo from "../../assets/news.png";

const Footer = () => {
  return (
    <div className={cn(styles.footer)}>
      <ul className={cn(styles.menu)}>
        <li>
          <a href="#">Log In</a>
        </li>
        <li>
          <a href="#">About Us</a>
        </li>
        <li>
          <a href="#">Publishers</a>
        </li>
        <li>
          <a href="#">Sitemap</a>
        </li>
      </ul>

      <div className={styles.poweredBy}>Powered by</div>
      <div className={cn(styles.logoWrapper)}>
        <img src={newsLogo} alt="news api" className={styles.logo} />
      </div>
      <div className={styles.copyright}>
        © 2023 Besider. Inspired by Insider
      </div>
    </div>
  );
};
export default Footer;
