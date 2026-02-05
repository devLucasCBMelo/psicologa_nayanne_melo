import styles from "./kindOfServiceCard.module.css";
import { FilmIcon, PinIcon } from "lucide-react";

type SessionType = "Online" | "Presencial";
type KindOfSessionType = {
  session: SessionType;
  onChangeSession: (value: SessionType) => void;
};

export const KindOfServiceCard = ({
  session,
  onChangeSession,
}: KindOfSessionType) => {
  return (
    <div className={styles.kindOfServiceContainer}>
      <div className={styles.kindOfServiceContainer_title}>
        <div>Tipo de Atendimento</div>
      </div>

      <div className={styles.kindOfServiceContainer_bottom}>
        <div className={styles.labelsContainer}>
          <div
            className={`${
              session === "Online" ? styles.label_01 : styles.label_02
            }`}
            onClick={() => onChangeSession("Online")}
          >
            <div className={styles.label_content}>
              <div
                className={`${
                  session === "Online"
                    ? styles.label_01_pin
                    : styles.label_02_pin
                }`}
              >
                <FilmIcon
                  className={`${
                    session === "Online" ? styles.pin_01 : styles.pin_02
                  }`}
                />
              </div>
              <div>
                <p className={styles.kindOfService_description}>Online</p>
                <p className={styles.kindOfService_place}>Via vídeochamada</p>
              </div>
            </div>
          </div>

          <div
            className={`${
              session === "Presencial" ? styles.label_01 : styles.label_02
            }`}
            onClick={() => onChangeSession("Presencial")}
          >
            <div className={styles.label_content}>
              <div
                className={`${
                  session === "Presencial"
                    ? styles.label_01_pin
                    : styles.label_02_pin
                }`}
              >
                <PinIcon
                  className={`${
                    session === "Presencial" ? styles.pin_01 : styles.pin_02
                  }`}
                />
              </div>
              <div>
                <p className={styles.kindOfService_description}>Presencial</p>
                <p className={styles.kindOfService_place}>No consultório</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
