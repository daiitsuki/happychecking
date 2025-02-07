import { useEffect, useState } from "react";
import { IEventData } from "../../routes/Home";
import styles from "../../styles/calendar/calendarReport.module.css";

interface ICalendarReportProps {
  year: number;
  month: number;
  eventData: IEventData[];
}

const CalendarReport: React.FC<ICalendarReportProps> = ({
  year,
  month,
  eventData,
}) => {
  const [data, setData] = useState<IEventData[]>([]);
  const dataFilter = () => {
    const filteredArr = eventData.filter(
      (obj) => obj.year === year && obj.month === month
    );
    setData(filteredArr);
  };
  useEffect(() => {
    dataFilter();
  }, [month]);
  return (
    <div className={styles.container}>
      {data.length === 0 ? (
        <span
          style={{
            fontSize: 14,
            marginTop: "auto",
            marginBottom: "auto",
            color: "gray",
          }}
        >
          {`${year}년 ${month}월의 정보가 없어요.`}
        </span>
      ) : (
        data
          .sort(
            (a, b) =>
              new Date(a.year, a.month, a.date).getTime() -
              new Date(b.year, b.month, b.date).getTime()
          )
          .map((result) => (
            <div key={result.id} className={styles.resultItem}>
              <div
                style={
                  result.btnType === 1
                    ? { backgroundColor: "var(--myyellow)" }
                    : result.btnType === 2
                    ? { backgroundColor: "var(--mygreen)" }
                    : { backgroundColor: "var(--myblue)" }
                }
                className={styles.resultType}
              ></div>
              <div className={styles.resultEvent}>{result.eventValue}</div>
              <span className={styles.resultDate}>
                {result.year}. {result.month}. {result.date}
              </span>
            </div>
          ))
      )}
    </div>
  );
};

export default CalendarReport;
