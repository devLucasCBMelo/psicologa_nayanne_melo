import styles from "./infocard.module.css";

export const InfoCard = () => {
  return (
    <div className={styles.infoContainer}>
      <div className={styles.infoContainer_top}>
        <div>Seus Dados</div>
      </div>

      <div className={styles.infoContainer_bottom}>
        <div className={styles.namephoneContainer}>
          <div className={styles.nameContainer}>
            <label htmlFor="name">Nome completo</label>
            <input
              type="text"
              id="name"
              placeholder="Digite seu nome completo"
            />
          </div>

          <div className={styles.phoneContainer}>
            <label htmlFor="">Telefone / Whatsapp</label>
            <input type="text" placeholder="(00) 00000-0000" />
          </div>
        </div>

        <div className={styles.emailContainer}>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="seu-email@gmail.com" />
        </div>
      </div>
    </div>
  );
};
