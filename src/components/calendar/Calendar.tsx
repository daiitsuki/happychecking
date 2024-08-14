import React, { useRef, useState } from "react";
import CalendarBody, { IDateData } from "./CalendarBody";
import styles from "../../styles/calendar/calendar.module.css";
import CalendarHeader from "./CalendarHeader";
import { IEventData } from "../../routes/Home";

interface ICalendarProps {
  eventData: IEventData[];
  setEventData: React.Dispatch<React.SetStateAction<IEventData[]>>;
  dataSave: () => Promise<void>;
  displayInfo: boolean;
  setDisplayInfo: React.Dispatch<React.SetStateAction<boolean>>;
  clickedDate: IDateData | undefined;
  setClickedDate: React.Dispatch<React.SetStateAction<IDateData | undefined>>;
}

export interface Itransition {
  isMove: boolean;
  direction?: string;
}

const Calendar: React.FC<ICalendarProps> = ({
  eventData,
  setEventData,
  dataSave,
  setDisplayInfo,
  setClickedDate,
  clickedDate,
  displayInfo,
}) => {
  const [criteria, setCriteria] = useState<Date>(new Date());
  const [transition, setTransition] = useState<Itransition>({ isMove: false });

  const timeoutRef = useRef<number | null>(null);

  const prevMonth = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      setTransition({ isMove: false });
    }
    setCriteria((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    setTransition({ isMove: true, direction: "prev" });
    timeoutRef.current = window.setTimeout(
      () => setTransition({ isMove: false }),
      500
    );
  };
  const nextMonth = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      setTransition({ isMove: false });
    }
    setCriteria((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    setTransition({ isMove: true, direction: "next" });
    timeoutRef.current = window.setTimeout(
      () => setTransition({ isMove: false }),
      500
    );
  };
  const goToday = () => {
    const today = new Date();
    const prevYear = criteria.getFullYear();
    const prevMonth = criteria.getMonth();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();

    if (prevYear !== todayYear || prevMonth !== todayMonth) {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        setTransition({ isMove: false });
      }
      const direction =
        prevYear > todayYear ||
        (prevYear === todayYear && prevMonth > todayMonth)
          ? "prev"
          : "next";
      setCriteria(today);
      setTransition({ isMove: true, direction });
      timeoutRef.current = window.setTimeout(
        () => setTransition({ isMove: false }),
        500
      );
    }
  };
  return (
    <div className={styles.calendarBox}>
      <CalendarHeader
        year={criteria.getFullYear()}
        month={criteria.getMonth() + 1}
        onPrevMonth={prevMonth}
        onNextMonth={nextMonth}
        onToday={goToday}
      />
      <CalendarBody
        year={criteria.getFullYear()}
        month={criteria.getMonth() + 1}
        eventData={eventData}
        dataSave={dataSave}
        setEventData={setEventData}
        displayInfo={displayInfo}
        setDisplayInfo={setDisplayInfo}
        clickedDate={clickedDate}
        setClickedDate={setClickedDate}
        transition={transition}
      />
    </div>
  );
};

export default Calendar;
