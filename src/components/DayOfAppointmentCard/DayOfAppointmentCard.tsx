import { useState } from "react";
import styles from "./dayOfAppointmentCard.module.css";

type DayOfAppointmentType = {
  selectedDate: Date | null;
  onChangeDate: (value: Date) => void;
};

export const DayOfAppointmentCard = ({
  selectedDate,
  onChangeDate,
}: DayOfAppointmentType) => {
  const week = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const getDaysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysArray = [
    ...Array(firstDayOfMonth).fill(null),
    ...Array.from({ length: getDaysInMonth }, (_, i) => i + 1),
  ];

  const isSameDay = (a: Date, b: Date) => {
    return (
      a.getDate() === b.getDate() &&
      a.getMonth() === b.getMonth() &&
      a.getFullYear() === b.getFullYear()
    );
  };

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));

  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const isPastDay = (day: number) => {
    const date = new Date(year, month, day);
    return date < new Date(today.setHours(0, 0, 0, 0));
  };

  function isToday(day: number) {
    return isSameDay(new Date(year, month, day), today);
  }

  function isSelected(day: number) {
    if (!selectedDate) return false;
    return isSameDay(new Date(year, month, day), selectedDate);
  }

  return (
    <div className={styles.container}>
      <div className={styles.dayOfAppointment_title}>
        <div>Escolha a Data</div>
      </div>

      <div className={styles.calendarControlContainer}>
        <button onClick={prevMonth} className={styles.arrowButton}>
          ‹
        </button>
        <strong>
          {currentDate.toLocaleString("pt-BR", {
            month: "long",
            year: "numeric",
          })}
        </strong>
        <button onClick={nextMonth} className={styles.arrowButton}>
          ›
        </button>
      </div>

      <div className={styles.weekDays}>
        {week.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className={styles.daysGrid}>
        {daysArray.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} />;
          }

          return (
            <button
              key={day}
              onClick={() => onChangeDate(new Date(year, month, day))}
              className={`
                ${styles.day}
                ${isPastDay(day) ? styles.past : styles.future}
                ${isToday(day) ? styles.today : ""}
                ${isSelected(day) ? styles.selected : ""}
              `}
              disabled={isPastDay(day) ? true : false}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};
