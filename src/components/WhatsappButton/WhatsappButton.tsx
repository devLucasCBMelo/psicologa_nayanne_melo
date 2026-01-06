import styles from "./whatsappButton.module.css";
import whatsappLogo from "../../images/whatsapp_logo.png";

export const WhatsappButton = () => {
  return (
    <button className={styles.consulta}>
      <img
        className={styles.consulta_img}
        src={whatsappLogo}
        alt="logo do whatsapp"
      />
      <h4>Agende a sua primeira consulta</h4>
    </button>
  );
};
