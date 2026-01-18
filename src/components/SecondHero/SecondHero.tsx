import { Brain, Heart, MapPin, Sparkle, Users, VideoIcon } from "lucide-react";
import { CardList } from "../CardList/CardList";
import styles from "./secondHero.module.css";
import { ServiceButton } from "../ServiceButton/ServiceButton";

export const SecondHero = () => {
  const cards = [
    {
      icon: <Brain color="#6B7C5F" />,
      title: "Terapia Individual",
      text: "Sessões personalizadas focadas nas suas necessidades e objetivos pessoais",
    },
    {
      icon: <Heart color="#6B7C5F" />,
      title: "Ansiedade e Depressão",
      text: "Tratamento especializado para transtornos de humor e ansiedade",
    },
    {
      icon: <Users color="#6B7C5F" />,
      title: "Terapia de Casal",
      text: "Apoio para melhorar a comunicação e fortalecer relacionamentos",
    },
    {
      icon: <Sparkle color="#6B7C5F" />,
      title: "Autoconhecimento",
      text: "Jornada de descoberta pessoal para uma vida mais autêntica",
    },
  ];

  return (
    <section className={styles.secondHeroContainer}>
      <div className={styles.specialties}>
        <span>ESPECIALIDADES</span>
        <h2>Como posso te ajudar</h2>
        <p>
          Cada pessoa é única, por isso ofereço diferentes abordagens
          terapêuticas para atender às suas necessidades específicas.
        </p>
      </div>
      <CardList cards={cards} />
      <div className={styles.secondHeroButtons}>
        <ServiceButton
          icon={<VideoIcon color="#9CAF88" />}
          description="Atendimento Online"
          color="#9CAF88"
          backgroundcolor="#E8F0E8"
        />
        <ServiceButton
          icon={<MapPin color="#C4A87D" />}
          description="Atendimento Presencial"
          color="#C4A87D"
          backgroundcolor="#F5F0ED"
        />
      </div>
    </section>
  );
};
