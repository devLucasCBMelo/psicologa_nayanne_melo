import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import styles from "./Home.module.css";
import { MainHero } from "../../components/MainHero/MainHero";
import { SecondHero } from "../../components/SecondHero/SecondHero";
import { ArrowRight, Calendar } from "lucide-react";

function Home() {
  return (
    <>
      <Header />
      <div className={styles.mainHome}>
        <MainHero />
        <SecondHero />

        <section className={styles.container_4}>
          <div className={styles.container_4_div}>
            <h2>
              Comece a sua jornada de <span>transformação hoje</span>
            </h2>
            <p>
              O primeiro passo é sempre o mais importante. Agende sua consulta e
              permita-se cuidar da sua saúde mental.
            </p>
            <button>
              <Calendar className={styles.calendarIcon} />
              <span>Agendar Consulta</span>
              <ArrowRight className={styles.arrowRightIcon} />
            </button>
            <p className={styles.container_4_last_p}>
              Primeira sessão com desconto especial
            </p>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default Home;
