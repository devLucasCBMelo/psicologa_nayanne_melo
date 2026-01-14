import { Heart } from "lucide-react";
import styles from "./footer.module.css";

function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.topContent}>
        <div className={styles.firstColumn}>
          <div className={styles.iconTextContainer}>
            <div className={styles.iconContainer}>
              <Heart className={styles.icon} />
            </div>
            <span>Psicologia</span>
          </div>
          <p>Cuidando da sua saúde mental com carinho e profissionalismo</p>
        </div>

        <div className={styles.secondColumn}>
          <h4>Links</h4>
          <ul>
            <li>
              <a href="">Início</a>
            </li>
            <li>
              <a href="">Sobre</a>
            </li>
            <li>
              <a href="">Agendar</a>
            </li>
          </ul>
        </div>

        <div className={styles.thirdColumn}>
          <h4>Contato</h4>
          <ul>
            <li>contato@psicologia.com</li>
            <li>(83) 99681-2018</li>
            <li>Calcadão, xxx - Centro, Solânea</li>
            <li>Liv Mall, xxx - Bessa, João Pessoa</li>
          </ul>
        </div>
      </div>

      <div className={styles.lastInfos}>
        2026 Psicóloga Nayanne Melo. Todos os direitos reservados.
      </div>
    </footer>
  );
}

export default Footer;
