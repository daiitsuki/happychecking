import React from "react";
import styles from "../../styles/calendar/calendarBody.module.css";
import { IDateData } from "./CalendarBody";

interface IDateBoxProps {
  year: number;
  month: number;
  date: number;
  ymd: string;
  currentMonth: boolean;
  event?: number[];
  btnType?: number;
  btnClicked: boolean;
  clickedDate: IDateData | undefined;
  onDateClick: () => void;
  isActive: boolean | 0 | undefined;
}

const DateBox: React.FC<IDateBoxProps> = ({
  year,
  month,
  date,
  ymd,
  currentMonth,
  event,
  btnType,
  btnClicked,
  clickedDate,
  onDateClick,
  isActive,
}) => {
  const colorMap = [
    "var(--backgray)",
    "var(--myyellow)",
    "var(--mygreen)",
    "var(--myblue)",
  ];

  return (
    <div
      className={currentMonth ? styles.currentDate : styles.notCurrentDate}
      onClick={onDateClick}
      style={
        isActive && btnType && currentMonth
          ? { backgroundColor: colorMap[btnType] }
          : !btnType && clickedDate && clickedDate.ymd === ymd
          ? { backgroundColor: "#b3a6ea" }
          : {}
      }
    >
      <span
        style={
          new Date().toLocaleDateString() ===
          new Date(year, month - 1, date).toLocaleDateString()
            ? { color: "#6643b5", fontSize: 15 }
            : {}
        }
      >
        {date}
      </span>
      <div>
        {[1, 2, 3].map((type) => (
          <span
            key={type}
            style={
              !btnClicked && event?.includes(type) && currentMonth
                ? { fontSize: 8, color: colorMap[type] }
                : { display: "none" }
            }
          >
            ●
          </span>
        ))}
      </div>
    </div>
  );
};

export default DateBox;
