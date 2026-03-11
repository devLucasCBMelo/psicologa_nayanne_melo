import { Link } from 'react-router-dom';
import { LoginButton } from '../GoogleButton/GoogleButton';
import styles from './header.module.css';

function Header() {
  return (
    <div className={`${styles.main_header}`}>
      <h1>Psicóloga Nayanne Melo</h1>
      <nav className={styles.navBar}>
        <h1>
          <Link to='/' className={styles.link}>
            Início
          </Link>{' '}
        </h1>
        <h1>Sobre</h1>
        <h1>
          <Link to='/agendamento' className={styles.link}>
            Agendar
          </Link>
        </h1>
      </nav>
      <LoginButton />
    </div>
  );
}

export default Header;
