import { useEffect, useState } from "react";
import { supabase } from "../../services/supabaseClient";
import styles from "./AppointmentScheduleCard.module.css";

type SlotsType = {
  start: string;
  end: string;
  interval: number;
};

type SlotType = {
  start: string;
  end: string;
  available: boolean;
};

type AppointmentScheduleType = {
  selectedDate: Date | null;
};

export const AppointmentScheduleCard = ({
  selectedDate,
}: AppointmentScheduleType) => {
  const [appointments, setAppointments] = useState<string[]>([]);

  function dateToISO(date: Date) {
    return date.toISOString().split("T")[0];
  }

  const isoDate = selectedDate ? dateToISO(selectedDate) : null;

  useEffect(() => {
    async function fetchAppointments() {
      const { data, error } = await supabase
        .from("appointments")
        .select("appointment_time")
        .eq("appointment_date", isoDate);

      if (data) {
        setAppointments(data.map((a) => a.appointment_time));
      }

      if (error) {
        console.log("Erro do tipo:", error);
      }
    }

    if (isoDate) {
      fetchAppointments();
    }
  }, [isoDate]);

  function addMinutes(time: string, minutes: number) {
    const [hours, mins] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, mins + minutes, 0, 0);

    const h = String(date.getHours()).padStart(2, "0");
    const m = String(date.getMinutes()).padStart(2, "0");

    return `${h}:${m}`;
  }

  function timeToMinutes(time: string) {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  }

  function generateSlots({ start, end, interval }: SlotsType) {
    const slots: { start: string; end: string }[] = [];

    let current = start;

    while (timeToMinutes(current) < timeToMinutes(end)) {
      slots.push(current);
      current = addMinutes(current, interval);
    }

    return slots;
  }

  const slots = generateSlots({
    start: "08:00",
    end: "18:00",
    interval: 60,
  });

  const schedule = slots.map((time) => ({
    time,
    available: !appointments.includes(time),
  }));

  console.log(schedule[0]);

  return (
    <>
      {selectedDate && (
        <div className={styles.container}>
          <div className={styles.scheduleOfAppointment_title}>
            <div>Horários Disponíveis</div>
          </div>

          <div>
            {schedule.map((slot, key) => (
              <button key={key}>{slot.time}</button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
