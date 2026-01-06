import { Calendar } from "lucide-react";
import styles from "./agendarConsultaButton.module.css";

export const AgendarConsultaButton = () => {
  return (
    <button className={styles.mainBody}>
      <Calendar className={styles.calendarIcon} />
      <span>Agendar Consulta</span>
    </button>
  );
};
