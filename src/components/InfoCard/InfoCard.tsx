import styles from './infocard.module.css';

type InfoCardType = {
  fullName: string | null;
  setFullName: (fullName: string | null) => void;
  phoneNumber: string | null;
  setPhoneNumber: (phoneNumber: string | null) => void;
  email: string | null;
  setEmail: (email: string | null) => void;
};

export const InfoCard = ({
  fullName,
  setFullName,
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,
}: InfoCardType) => {
  return (
    <div className={styles.infoContainer}>
      <div className={styles.infoContainer_top}>
        <div>Seus Dados</div>
      </div>

      <div className={styles.infoContainer_bottom}>
        <div className={styles.namephoneContainer}>
          <div className={styles.nameContainer}>
            <label htmlFor='name'>Nome completo</label>
            <input
              type='text'
              id='name'
              placeholder='Digite seu nome completo'
              value={fullName ?? ''}
              onChange={(event) => setFullName(event.target.value)}
            />
          </div>

          <div className={styles.phoneContainer}>
            <label htmlFor=''>Telefone / Whatsapp</label>
            <input
              type='text'
              placeholder='(00) 00000-0000'
              value={phoneNumber ?? ''}
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
          </div>
        </div>

        <div className={styles.emailContainer}>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            placeholder='seu-email@gmail.com'
            value={email ?? ''}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
