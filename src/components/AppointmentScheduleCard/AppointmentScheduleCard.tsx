import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import styles from './AppointmentScheduleCard.module.css';

type SlotsType = {
  start: string;
  end: string;
  interval: number;
};

type AppointmentScheduleType = {
  selectedDate: Date | null;
  selectedHour: string | null;
  setSelectedHour: (time: string) => void;
};

export const AppointmentScheduleCard = ({
  selectedDate,
  selectedHour,
  setSelectedHour,
}: AppointmentScheduleType) => {
  const [appointments, setAppointments] = useState<string[]>([]);

  function dateToISO(date: Date) {
    return date.toISOString().split('T')[0];
  }

  const isoDate = selectedDate ? dateToISO(selectedDate) : null;

  useEffect(() => {
    async function fetchAppointments() {
      const { data, error } = await supabase
        .from('appointments')
        .select('appointment_time')
        .eq('appointment_date', isoDate);

      if (data) {
        setAppointments(data.map((a) => a.appointment_time));
      }

      if (error) {
        console.log('Erro do tipo:', error);
      }
    }

    if (isoDate) {
      fetchAppointments();
    }
  }, [isoDate]);

  function addMinutes(time: string, minutes: number) {
    const [hours, mins] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, mins + minutes, 0, 0);

    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');

    return `${h}:${m}`;
  }

  function timeToMinutes(time: string) {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  }

  function generateSlots({ start, end, interval }: SlotsType) {
    const slots: { start: string; end: string }[] = [];

    let current = start;

    while (timeToMinutes(current) < timeToMinutes(end)) {
      const next = addMinutes(current, interval);
      slots.push({ start: current, end: next });
      current = next;
    }

    return slots;
  }

  function handleSelectHour(time: string) {
    setSelectedHour(time);
  }

  const slots = generateSlots({
    start: '08:00',
    end: '18:00',
    interval: 60,
  });

  const schedule = slots.map((slot) => ({
    start: slot.start,
    end: slot.end,
    available: !appointments.includes(slot.start),
  }));

  return (
    <>
      {selectedDate && (
        <div className={styles.container}>
          <div className={styles.scheduleOfAppointment_title}>
            <div>Horários Disponíveis</div>
          </div>

          <div className={styles.timeGrid}>
            {schedule.map((slot, key) => {
              const isSelected = selectedHour === slot.start;

              return (
                <button
                  key={key}
                  disabled={!slot.available}
                  onClick={() => handleSelectHour(slot.start)}
                  className={`${styles.timeButton} ${
                    isSelected ? styles.selected : ''
                  }`}
                >
                  {slot.start} - {slot.end}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
