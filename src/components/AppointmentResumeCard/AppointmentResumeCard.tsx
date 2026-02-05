import { Calendar, CreditCard, VideoIcon } from "lucide-react";
import styles from "./appointmentResumeCard.module.css";

type SessionType = "Online" | "Presencial";

type AppointmentResumeType = {
  session: SessionType;
  serviceValue: number;
  date?: Date | null;
};

export const AppointmentResumeCard = ({
  session,
  serviceValue,
  date,
}: AppointmentResumeType) => {
  const formattedDate = date?.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <div className={styles.resumeContainer}>
      <h3>Resumo da consulta</h3>
      <div>
        {date ? (
          <div className={styles.resumeContainer_top}>
            <div className={styles.iconRightSideContainer}>
              <Calendar className={styles.iconRightSide} />
            </div>
            <div>
              <p className={styles.firstP}>Data</p>
              <p className={styles.secondP}>{formattedDate}</p>
            </div>
          </div>
        ) : null}
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
