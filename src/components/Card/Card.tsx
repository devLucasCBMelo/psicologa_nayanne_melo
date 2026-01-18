import { ReactNode } from "react";
import styles from "./card.module.css";

export type CardProps = {
  icon: ReactNode;
  title: string;
  text: string;
};

export const Card = ({ icon, title, text }: CardProps) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardIconContainer}>{icon}</div>
      <h2 className={styles.cardTitle}>{title}</h2>
      <p className={styles.cardText}>{text}</p>
    </div>
  );
};
