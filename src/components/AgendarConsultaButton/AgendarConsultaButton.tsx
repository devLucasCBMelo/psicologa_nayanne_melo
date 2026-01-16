import { Calendar } from "lucide-react";
import styles from "./agendarConsultaButton.module.css";
import { useNavigate } from "react-router-dom";

export const AgendarConsultaButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/agendamento");
  };

  return (
    <button className={styles.mainBody} onClick={handleClick}>
      <Calendar className={styles.calendarIcon} />
      <span>Agendar Consulta</span>
    </button>
  );
};
