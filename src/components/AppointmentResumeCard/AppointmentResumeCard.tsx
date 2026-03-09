import { Calendar, CreditCard, VideoIcon, WatchIcon } from 'lucide-react';
import styles from './appointmentResumeCard.module.css';
import { useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import { useNavigate } from 'react-router-dom';

type SessionType = 'Online' | 'Presencial';

type AppointmentResumeType = {
  fullName: string | null;
  phoneNumber: string | null;
  email: string | null;
  session: SessionType;
  serviceValue: number;
  date?: Date | null;
  hour: string | null;
};

export const AppointmentResumeCard = ({
  fullName,
  phoneNumber,
  email,
  session,
  serviceValue,
  date,
  hour,
}: AppointmentResumeType) => {
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<{
    qr_code_64: string;
    qr_code_copy: string;
  } | null>(null);
  const formattedDate = date?.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handlePayment = async () => {
    if (!fullName || !phoneNumber || !email) {
      alert('Por favor, preencha seu Nome, E-mail e Telefone');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-pix', {
        body: {
          nome: fullName,
          email,
          valor: serviceValue,
          dataConsulta: date,
          horaConsulta: hour,
        },
      });

      if (error) throw error;
      setPaymentData(data);
    } catch (error) {
      console.error('Erro ao gerar PIX:', error);
      alert('Houve um erro ao gerar o pagamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();
  const GoToPaymentPage = () => {
    if (!fullName || !phoneNumber || !email) {
      alert('Por favor, preencha seu Nome, E-mail e Telefone');
      return;
    }

    navigate('/pagamento');
  };

  return (
    <div className={styles.resumeContainer}>
      <h3>Resumo da consulta</h3>
      <div>
        {date && (
          <div className={styles.resumeContainer_top}>
            <div className={styles.iconRightSideContainer}>
              <Calendar className={styles.iconRightSide} />
            </div>
            <div>
              <p className={styles.firstP}>Data</p>
              <p className={styles.secondP}>{formattedDate}</p>
            </div>
          </div>
        )}
        <div className={styles.resumeContainer_top}>
          <div className={styles.iconRightSideContainer}>
            <VideoIcon className={styles.iconRightSide} />
          </div>
          <div>
            <p className={styles.firstP}>Tipo de sessão</p>
            <p className={styles.secondP}>{session}</p>
          </div>
        </div>
        {hour && (
          <div className={styles.resumeContainer_top}>
            <div className={styles.iconRightSideContainer}>
              <WatchIcon className={styles.iconRightSide} />
            </div>
            <div>
              <p className={styles.firstP}>Horário</p>
              <p className={styles.secondP}>{hour}</p>
            </div>
          </div>
        )}
        <div className={styles.lineDiv}></div>
        <div className={styles.valueContainer}>
          <span className={styles.firstSpan}>Valor da consulta</span>
          <span className={styles.secondSpan}>R$ {serviceValue},00</span>
        </div>
        {!paymentData ? (
          <>
            <button
              className={styles.paymentButton}
              onClick={GoToPaymentPage}
              disabled={loading || !hour}
            >
              <CreditCard className={styles.creditCardIcon} />
              {loading ? 'Gerando o PIX....' : 'Confirmar e Pagar'}
            </button>
            <p className={styles.thirdP}>Pagamento seguro via PIX ou cartão</p>
          </>
        ) : (
          <div className={styles.pixResult}>
            <h4>Aponte a câmera para o QR Code:</h4>
            <div className={styles.pixImageContainer}>
              <img
                src={`data:image/png;base64,${paymentData.qr_code_64}`}
                alt='QR Code PIX'
                className={styles.qrCodeImage}
              />
            </div>
            <button
              className={styles.copyButton}
              onClick={() => {
                navigator.clipboard.writeText(paymentData.qr_code_copy);
                alert('Código copiado!');
              }}
            >
              Copiar código PIX
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
