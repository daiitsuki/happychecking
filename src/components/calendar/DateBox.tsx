import React from "react";
import styles from "../../styles/calendar/calendarBody.module.css";

interface DateBoxProps {
  year: number;
  month: number;
  date: number;
  currentMonth: boolean;
  event?: number[];
  btnType?: number;
  btnClicked: boolean;
  onDateClick: () => void;
  isActive: boolean | 0 | undefined;
}

const DateBox: React.FC<DateBoxProps> = ({
  year,
  month,
  date,
  currentMonth,
  event,
  btnType,
  btnClicked,
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
      style={isActive && btnType ? { backgroundColor: colorMap[btnType] } : {}}
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
              !btnClicked && event?.includes(type)
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
