import { ArrowLeft, Calendar } from "lucide-react";
import Header from "../../components/Header/Header";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./toSchedule.module.css";
import { motion } from "framer-motion";
import { InfoCard } from "../../components/InfoCard/InfoCard";
import { KindOfServiceCard } from "../../components/KindOfServiceCard/KindOfServiceCard";
import { AppointmentResumeCard } from "../../components/AppointmentResumeCard/AppointmentResumeCard";
import { DayOfAppointmentCard } from "../../components/DayOfAppointmentCard/DayOfAppointmentCard";
import { AppointmentScheduleCard } from "../../components/AppointmentScheduleCard/AppointmentScheduleCard";

type SessionType = "Online" | "Presencial";

function ToSchedule() {
  const [session, setSession] = useState<SessionType>("Online");
  const [serviceValue] = useState(200);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  console.log("Horário", selectedDate);
  return (
    <>
      <Header />
      <div className={styles.container}>
        <motion.div
          className={styles.contentContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <div>
              <Link
                to="/psicologa_nayanne_melo"
                className={styles.goBackContainer}
              >
                <ArrowLeft className={styles.arrowIcon} />
                Voltar
              </Link>
            </div>

            <div className={styles.aboveSections}>
              <div className={styles.calendarContainer}>
                <Calendar className={styles.calendarIcon} />
                <span>Agendamento Online</span>
              </div>

              <h1>
                Agende sua <span>consulta</span>
              </h1>

              <p>Escolha a data e horário que melhor se adequam à sua rotina</p>
            </div>
          </div>

          <div className={styles.sectionsContainer}>
            <section className={styles.leftSection}>
              <InfoCard />

              <KindOfServiceCard
                session={session}
                onChangeSession={setSession}
              />

              <DayOfAppointmentCard
                selectedDate={selectedDate}
                onChangeDate={setSelectedDate}
              />

              <AppointmentScheduleCard selectedDate={selectedDate} />
            </section>

            <section className={styles.rightSection}>
              <AppointmentResumeCard
                session={session}
                serviceValue={serviceValue}
                date={selectedDate}
              />
            </section>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default ToSchedule;
