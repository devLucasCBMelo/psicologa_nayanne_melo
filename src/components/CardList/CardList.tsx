import { Card, CardProps } from "../Card/Card";
import styles from "./cardList.module.css";

export type CardListProps = {
  cards: CardProps[];
};

export const CardList = ({ cards }: CardListProps) => {
  return (
    <div className={styles.cardListContainer}>
      {cards.map((card, index) => (
        <Card
          key={index}
          icon={card.icon}
          title={card.title}
          text={card.text}
        />
      ))}
    </div>
  );
};
