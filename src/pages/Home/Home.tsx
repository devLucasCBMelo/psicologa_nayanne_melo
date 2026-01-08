import AboutMe from "../../components/AboutMe/AboutMe";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import styles from "./Home.module.css";
import nayphone from "../../images/nayphone-removebg.png";
import { MainHero } from "../../components/MainHero/MainHero";

function Home() {
  return (
    <>
      <Header />
      <div className={styles.mainHome}>
        <MainHero />
        <div className={styles.container_2}>
          <div className={styles.container_2_left}>
            <img src={nayphone} alt="nayanne no telefone" />
          </div>
          <div className={styles.container_2_div}>
            <h2 className={styles.lora_xablau}>
              Entenda as vantagens da terapia online
            </h2>
            <div className={styles.container_2_div_number}>
              <h2>1</h2>
              <h3>No conforto da sua casa</h3>
            </div>

            <div className={styles.container_2_div_number}>
              <h2>2</h2>
              <h3>Oferece maior flexibilidade</h3>
            </div>

            <div className={styles.container_2_div_number}>
              <h2>3</h2>
              <h3>Garante o apoio emocional</h3>
            </div>

            <div className={styles.container_2_div_number}>
              <h2>4</h2>
              <h3>Minimizar a distância</h3>
            </div>
          </div>
        </div>

        <AboutMe />
        <Footer />
      </div>
    </>
  );
}

export default Home;
