import React, { useState } from "react";
import CalendarBody, { IDateData } from "./CalendarBody";
import styles from "../../styles/calendar/calendar.module.css";
import CalendarHeader from "./CalendarHeader";

interface ICalendarProps {
  displayInfo: boolean;
  setDisplayInfo: React.Dispatch<React.SetStateAction<boolean>>;
  clickedDate: IDateData | undefined;
  setClickedDate: React.Dispatch<React.SetStateAction<IDateData | undefined>>;
}

const Calendar: React.FC<ICalendarProps> = ({
  setDisplayInfo,
  setClickedDate,
  clickedDate,
  displayInfo,
}) => {
  class DDate {
    public year: number;
    public month: number;
    public date: number;
    public day: string;
    public numDay: number;
    constructor(private newdate: Date) {
      this.year = newdate.getFullYear();
      this.month = newdate.getMonth() + 1;
      this.date = newdate.getDate();
      this.day = ["일", "월", "화", "수", "목", "금", "토"][newdate.getDay()];
      this.numDay = newdate.getDay();
    }
  }

  const [criteria, setCriteria] = useState<DDate>(new DDate(new Date()));
  const today = new Date();

  const prevMonth = () =>
    setCriteria((prev) => new DDate(new Date(prev.year, prev.month - 2, 1)));

  const nextMonth = () =>
    setCriteria((prev) => new DDate(new Date(prev.year, prev.month, 1)));

  const goToday = () => setCriteria(new DDate(today));

  return (
    <div className={styles.calendarBox}>
      <CalendarHeader
        year={criteria.year}
        month={criteria.month}
        onPrevMonth={prevMonth}
        onNextMonth={nextMonth}
        onToday={goToday}
      />
      <CalendarBody
        year={criteria.year}
        month={criteria.month}
        displayInfo={displayInfo}
        setDisplayInfo={setDisplayInfo}
        clickedDate={clickedDate}
        setClickedDate={setClickedDate}
      />
    </div>
  );
};

export default Calendar;
