import { LoginButton } from "../LoginButton/LoginButton";
import styles from "./header.module.css";

function Header() {
  return (
    <div className={`${styles.main_header}`}>
      <h1>Psicóloga Nayanne Melo</h1>
      <nav className={styles.navBar}>
        <h1>Início</h1>
        <h1>Sobre</h1>
        <h1>Agendar</h1>
      </nav>
      <LoginButton />
    </div>
  );
}

export default Header;
