import { Heart } from "lucide-react";
import styles from "./MainHero.module.css";
import { AgendarConsultaButton } from "../AgendarConsultaButton/AgendarConsultaButton";
import { AboutMeButton } from "../AboutMeButton/AboutMeButton";
import fotoPerfil from "../../images/foto_de_perfil2.jpg";

export const MainHero = () => {
  return (
    <div className={styles.mainHero}>
      <div className={styles.mainHeroLeftSide}>
        <div className={styles.leftSideTop}>
          <Heart className={styles.heart} />
          <span>Cuidando da sua saúde mental</span>
        </div>
        <h1 className={styles.title1}>Encontre seu</h1>
        <h1 className={styles.title2}>equilíbrio interior</h1>
        <p>
          Um espaço seguro e acolhedor para você explorar suas emoções, superar
          desafios e construir uma vida mais plena e significativa
        </p>
        <div className={styles.buttonsBar}>
          <AgendarConsultaButton />
          <AboutMeButton />
        </div>
      </div>

      <div className={styles.mainHeroRightSide}>
        <img src={fotoPerfil} alt="foto de perfil da psicóloga Nayanne Melo" />

        <div className={styles.infoCard}>
          <div className={styles.circleIcon}>
            <Heart className={styles.heartIcon} />
          </div>
          <div className={styles.infoCardText}>
            <strong>+100 pacientes</strong>
            <span>atendidos com carinho</span>
          </div>
        </div>
      </div>
    </div>
  );
};
