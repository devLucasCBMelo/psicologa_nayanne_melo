/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';
import styles from './payment.module.css';
import Header from '../../components/Header/Header';

interface LocationState {
  fullName: string;
  email: string;
  phoneNumber: string;
  serviceValue: number;
  date: string;
  hour: string;
}

interface BrickSettings {
  formData: {
    token?: string;
    installments?: number;
    payment_method_id: string;
    issuer_id?: number;
    payer: { email: string };
  };
}

interface PaymentResponse {
  qr_code_64?: string;
  qr_code_copy?: string;
  status?: string;
  payment_id: number;
}

declare global {
  interface Window {
    MercadoPago: any;
  }
}

export const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const state = location.state as LocationState | null;
  const brickController = useRef<any>(null);
  const [paymentResult, setPaymentResult] = useState<PaymentResponse | null>(
    null
  );

  useEffect(() => {
    if (!state) return;

    let isInitialized = false;

    const init = async () => {
      if (
        !(window as any).MercadoPago ||
        isInitialized ||
        brickController.current
      )
        return;

      isInitialized = true;

      const mp = new (window as any).MercadoPago(
        import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY,
        { locale: 'pt-BR' }
      );
      const bricksBuilder = mp.bricks();

      const container = document.getElementById('paymentBrick_container');
      if (container) container.innerHTML = '';

      try {
        brickController.current = await bricksBuilder.create(
          'payment',
          'paymentBrick_container',
          {
            initialization: {
              amount: state.serviceValue,
              payer: { name: state.fullName, email: state.email },
            },
            customization: {
              paymentMethods: {
                ticket: undefined,
                bankTransfer: 'all',
                creditCard: 'all',
                maxInstallments: 1,
              },
            },
            callbacks: {
              // 1. AQUI ATIVAMOS O SDKLOADED
              onReady: () => {
                setSdkLoaded(true);
                console.log('Brick pronto!');
              },
              onError: (error: any) => {
                console.error('Erro no SDK:', error);
                isInitialized = false;
              },
              onSubmit: async ({ formData }: BrickSettings) => {
                setLoading(true);
                try {
                  const { data, error } = await supabase.functions.invoke(
                    'create-pix',
                    {
                      body: {
                        nome: state.fullName,
                        email: state.email,
                        valor: state.serviceValue,
                        dataConsulta: state.date,
                        horaConsulta: state.hour,
                        token: formData.token,
                        installments: formData.installments,
                        payment_method_id: formData.payment_method_id,
                        issuer_id: formData.issuer_id,
                      },
                    }
                  );

                  if (error) throw error;
                  console.log('O que o Supabase retornou:', data);
                  setPaymentResult(data);
                } catch (err) {
                  console.error(err);
                  alert('Erro ao processar pagamento.');
                } finally {
                  setLoading(false);
                }
              },
            },
          }
        );
      } catch (error) {
        console.error('Erro ao criar o Brick:', error);
        isInitialized = false;
      }
    };

    const timer = setInterval(() => {
      if ((window as any).MercadoPago) {
        init();
        clearInterval(timer);
      }
    }, 500);

    return () => {
      clearInterval(timer);
      const container = document.getElementById('paymentBrick_container');
      if (container) container.innerHTML = '';
      brickController.current = null;
    };
  }, [state]);

  if (!state) {
    return (
      <>
        <Header />
        <div className={styles.paymentPage}>
          <div className={styles.errorCard}>
            <h2>Dados não encontrados</h2>
            <p>Selecione um horário primeiro.</p>
            <button
              onClick={() => navigate('/agendamento')}
              className={styles.backButton}
            >
              Voltar
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className={styles.paymentPage}>
        <h2>Finalizar Agendamento</h2>

        <div className={styles.summary}>
          <p>
            <strong>Paciente:</strong> {state.fullName}
          </p>
          <p>
            <strong>Data:</strong> {state.date} às {state.hour}
          </p>
          <p className={styles.price}>
            <strong>Total:</strong> R$ {state.serviceValue},00
          </p>
        </div>

        {paymentResult ? (
          <div className={styles.resultContainer}>
            {paymentResult.qr_code_64 ? (
              <div className={styles.pixSection}>
                <h3>Escaneie o QR Code abaixo:</h3>
                <img
                  className={styles.qrCodeImage}
                  src={`data:image/png;base64,${paymentResult.qr_code_64}`}
                  alt='PIX'
                />
                <button
                  className={styles.copyButton}
                  onClick={() => {
                    if (paymentResult.qr_code_copy)
                      navigator.clipboard.writeText(paymentResult.qr_code_copy);
                    alert('Copiado!');
                  }}
                >
                  Copiar Código PIX
                </button>
              </div>
            ) : (
              <div className={styles.successSection}>
                <h3>
                  ✅ Pagamento{' '}
                  {paymentResult.status === 'approved'
                    ? 'Aprovado'
                    : 'Recebido'}
                  !
                </h3>
                <p>Sua consulta está confirmada.</p>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.formWrapper}>
            {!sdkLoaded && (
              <div className={styles.sdkLoading}>
                <div className={styles.spinner}></div>
                <p>Carregando opções de pagamento...</p>
              </div>
            )}

            <div
              id='paymentBrick_container'
              style={{ display: sdkLoaded ? 'block' : 'none' }}
            ></div>
          </div>
        )}

        {loading && (
          <div className={styles.overlay}>
            <div className={styles.spinner}></div>
            <p>Processando pagamento...</p>
          </div>
        )}
      </div>
    </>
  );
};
