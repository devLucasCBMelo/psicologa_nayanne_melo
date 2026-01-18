import { ArrowLeft, Calendar, FilmIcon, PinIcon } from "lucide-react";
import Header from "../../components/Header/Header";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./toSchedule.module.css";
import { motion } from "framer-motion";

function ToSchedule() {
  const [session, setSession] = useState("Online");
  const [serviceValue, setServiceValue] = useState(200);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <motion.div
          className={styles.contentContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <div>
              <Link
                to="/psicologa_nayanne_melo"
                className={styles.goBackContainer}
              >
                <ArrowLeft className={styles.arrowIcon} />
                Voltar
              </Link>
            </div>

            <div className={styles.aboveSections}>
              <div className={styles.calendarContainer}>
                <Calendar className={styles.calendarIcon} />
                <span>Agendamento Online</span>
              </div>

              <h1>
                Agende sua <span>consulta</span>
              </h1>

              <p>Escolha a data e horário que melhor se adequam à sua rotina</p>
            </div>
          </div>

          <div className={styles.sectionsContainer}>
            <section className={styles.leftSection}>
              <div className={styles.infoContainer}>
                <div className={styles.infoContainer_top}>
                  <div>Seus Dados</div>
                </div>

                <div className={styles.infoContainer_bottom}>
                  <div className={styles.namephoneContainer}>
                    <div className={styles.nameContainer}>
                      <label htmlFor="name">Nome completo</label>
                      <input
                        type="text"
                        id="name"
                        placeholder="Digite seu nome completo"
                      />
                    </div>

                    <div className={styles.phoneContainer}>
                      <label htmlFor="">Telefone / Whatsapp</label>
                      <input type="text" placeholder="(00) 00000-0000" />
                    </div>
                  </div>

                  <div className={styles.emailContainer}>
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="seu-email@gmail.com" />
                  </div>
                </div>
              </div>

              <div className={styles.kindOfServiceContainer}>
                <div className={styles.kindOfServiceContainer_title}>
                  <div>Tipo de Atendimento</div>
                </div>

                <div className={styles.kindOfServiceContainer_bottom}>
                  <div className={styles.labelsContainer}>
                    <div className={styles.label_01}>
                      <div className={styles.label_content}>
                        <div className={styles.label_01_pin}>
                          <FilmIcon className={styles.pin_01} />
                        </div>
                        <div>
                          <p className={styles.kindOfService_description}>
                            Online
                          </p>
                          <p className={styles.kindOfService_place}>
                            Via vídeochamada
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={styles.label_02}>
                      <div className={styles.label_content}>
                        <div className={styles.label_02_pin}>
                          <PinIcon className={styles.pin_02} />
                        </div>
                        <div>
                          <p className={styles.kindOfService_description}>
                            Presencial
                          </p>
                          <p className={styles.kindOfService_place}>
                            No consultório
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className={styles.rightSection}>
              <h3>Resumo da consulta</h3>
              <div>
                <div>
                  <FilmIcon />
                </div>
                <div>
                  <p>Tipo de sessão</p>
                  <p>`{session}`</p>
                </div>
                <div>
                  <span>Valor da consulta</span>
                  <span>R$ {serviceValue},00</span>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default ToSchedule;
