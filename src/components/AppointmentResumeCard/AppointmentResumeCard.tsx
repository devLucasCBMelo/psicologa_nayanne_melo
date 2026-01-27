import { CreditCard, VideoIcon } from "lucide-react";
import styles from "./appointmentResumeCard.module.css";

type SessionType = "Online" | "Presencial";

type AppointmentResumeType = {
  session: SessionType;
  serviceValue: number;
};

export const AppointmentResumeCard = ({
  session,
  serviceValue,
}: AppointmentResumeType) => {
  return (
    <div className={styles.resumeContainer}>
      <h3>Resumo da consulta</h3>
      <div>
        <div className={styles.resumeContainer_top}>
          <div className={styles.iconRightSideContainer}>
            <VideoIcon className={styles.iconRightSide} />
          </div>
          <div>
            <p className={styles.firstP}>Tipo de sessão</p>
            <p className={styles.secondP}>{session}</p>
          </div>
        </div>
        <div className={styles.lineDiv}></div>
        <div className={styles.valueContainer}>
          <span className={styles.firstSpan}>Valor da consulta</span>
          <span className={styles.secondSpan}>R$ {serviceValue},00</span>
        </div>
        <button>
          <CreditCard className={styles.creditCardIcon} />
          Confirmar e Pagar
        </button>
        <p className={styles.thirdP}>Pagamento seguro via PIX ou cartão</p>
      </div>
    </div>
  );
};
