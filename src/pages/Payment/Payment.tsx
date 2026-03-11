/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';
import styles from './payment.module.css';
import Header from '../../components/Header/Header';

// 1. Tipagem das informações que vêm do agendamento
interface LocationState {
  fullName: string;
  email: string;
  phoneNumber: string;
  serviceValue: number;
  date: string;
  hour: string;
}

// 2. Tipagem do formulário que o Mercado Pago devolve
interface BrickSettings {
  formData: {
    token?: string;
    installments?: number;
    payment_method_id: string;
    issuer_id?: number;
    payer: {
      email: string;
    };
  };
}

// 3. Ensinando o TS o que é o objeto global do Mercado Pago
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  const [paymentResult, setPaymentResult] = useState<any>(null);

  useEffect(() => {
    if (!state) return;

    // Variável de controle local para evitar disparos duplos enquanto o SDK carrega
    let isInitialized = false;

    const init = async () => {
      // Se o SDK não existe ou se já iniciamos ou se já existe um brick, para aqui
      if (
        !(window as any).MercadoPago ||
        isInitialized ||
        brickController.current
      )
        return;

      isInitialized = true;
      setSdkLoaded(true);

      const mp = new (window as any).MercadoPago(
        import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY,
        { locale: 'pt-BR' }
      );
      const bricksBuilder = mp.bricks();

      // Limpeza física do container antes de injetar
      const container = document.getElementById('paymentBrick_container');
      if (container) container.innerHTML = '';

      try {
        brickController.current = await bricksBuilder.create(
          'payment',
          'paymentBrick_container',
          {
            initialization: {
              amount: state.serviceValue,
              payer: {
                name: state.fullName,
                email: state.email,
              },
            },
            customization: {
              paymentMethods: {
                ticket: undefined,
                bankTransfer: 'all',
                creditCard: 'all',
                maxInstallments: 1,
              },
              visual: {
                texts: {
                  payButton: 'Pagar Consulta',
                },
              },
            },
            callbacks: {
              onReady: () => console.log('Brick pronto!'),
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
                  setPaymentResult(data);
                  alert('Pagamento processado com sucesso!');
                } catch (err) {
                  console.error(err);
                  alert('Erro ao processar pagamento.');
                } finally {
                  setLoading(false);
                }
              },
              onError: (error: any) => console.error('Erro no SDK:', error),
            },
          }
        );
      } catch (error) {
        console.error('Erro ao criar o Brick:', error);
        isInitialized = false;
      }
    };

    // Tenta iniciar. Se falhar (SDK não carregou), tenta de novo em 500ms
    const timer = setInterval(() => {
      if ((window as any).MercadoPago) {
        init();
        clearInterval(timer);
      }
    }, 500);

    return () => {
      clearInterval(timer);
      // Se o componente desmontar, limpamos o container para o próximo uso
      const container = document.getElementById('paymentBrick_container');
      if (container) container.innerHTML = '';
      brickController.current = null;
    };
  }, [state]);

  // Se o usuário entrou na página sem vir do agendamento
  if (!state) {
    return (
      <>
        <Header />
        <div className={styles.paymentPage}>
          <div className={styles.errorCard}>
            <h2>Dados não encontrados</h2>
            <p>
              Para realizar o pagamento, você precisa selecionar um horário
              primeiro.
            </p>
            <button
              onClick={() => navigate('/agendamento')}
              className={styles.backButton}
            >
              Voltar para Agendamento
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
            <strong>Serviço:</strong> Consulta Online
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
            {paymentResult.point_of_interaction ? (
              <div className={styles.pixSection}>
                <h3>Quase lá! Escaneie o QR Code abaixo:</h3>
                <img
                  src={`data:image/png;base64,${paymentResult.point_of_interaction.transaction_data.qr_code_base64}`}
                  alt='QR Code PIX'
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      paymentResult.point_of_interaction.transaction_data
                        .qr_code
                    );
                    alert('Código copiado!');
                  }}
                >
                  Copiar Código Copia e Cola
                </button>
              </div>
            ) : (
              // CASO SEJA CARTÃO (Status aprovado)
              <div className={styles.successSection}>
                <h3>✅ Pagamento Aprovado!</h3>
                <p>
                  Sua consulta está confirmada. Você receberá os detalhes por
                  e-mail.
                </p>
              </div>
            )}
          </div>
        ) : (
          <>
            {!sdkLoaded && <p>Carregando opções de pagamento...</p>}
            <div id='paymentBrick_container'></div>
          </>
        )}

        {loading && (
          <div className={styles.overlay}>
            <div className={styles.spinner}></div>
            <p>Processando seu pagamento, por favor aguarde...</p>
          </div>
        )}
      </div>
    </>
  );
};
