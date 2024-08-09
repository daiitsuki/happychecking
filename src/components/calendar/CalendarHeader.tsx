import styles from "../../styles/calendar/calendar.module.css";

interface ICalendarHeaderProps {
  year: number;
  month: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

const CalendarHeader: React.FC<ICalendarHeaderProps> = ({
  year,
  month,
  onPrevMonth,
  onNextMonth,
  onToday,
}) => {
  return (
    <div className={styles.menuBar}>
      <div className={styles.btnBox}>
        <button onClick={onPrevMonth} className={styles.monthChangeBtn}>
          {"<"}
        </button>
        <button onClick={onToday} className={styles.todayBtn}>
          {year}. {month}월
        </button>
        <button onClick={onNextMonth} className={styles.monthChangeBtn}>
          {">"}
        </button>
      </div>
      <div className={styles.dayBox}>
        <span>S</span>
        <span>M</span>
        <span>T</span>
        <span>W</span>
        <span>T</span>
        <span>F</span>
        <span>S</span>
      </div>
    </div>
  );
};

export default CalendarHeader;
