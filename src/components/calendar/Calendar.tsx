import React, { useState } from "react";
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

  const prevMonth = () =>
    setCriteria((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));

  const nextMonth = () =>
    setCriteria((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

  const goToday = () => setCriteria(new Date());

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
      />
    </div>
  );
};

export default Calendar;
