import React, { ReactElement } from "react";
import styles from "./serviceButton.module.css";

export type ServiceButtonType = {
  icon: ReactElement;
  description: string;
  color: string;
  backgroundcolor: string;
};

export const ServiceButton = ({
  icon,
  description,
  color,
  backgroundcolor,
}: ServiceButtonType) => {
  return (
    <div
      className={styles.serviceButtonContainer}
      style={{ "--btn-bg": backgroundcolor } as React.CSSProperties}
    >
      <div className={styles.serviceButtonIcon}>{icon}</div>
      <span
        className={styles.serviceButtonDescription}
        style={{ "--btn-color": color } as React.CSSProperties}
      >
        {description}
      </span>
    </div>
  );
};
