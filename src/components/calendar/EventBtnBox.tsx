import React from "react";
import { IEventData } from "../../routes/Home";
import styles from "../../styles/calendar/calendarBody.module.css";

interface IEventBtnBoxProps {
  btnType?: number;
  eventData: IEventData[];
  onBtnClick: (btnId: number) => void;
  dataSave: () => void;
  year: number;
  month: number;
}

const EventBtnBox: React.FC<IEventBtnBoxProps> = ({
  btnType,
  eventData,
  onBtnClick,
  dataSave,
  year,
  month,
}) => (
  <div className={styles.btnBox}>
    <button className={`${styles.btn} ${styles.save}`} onClick={dataSave}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        width="18"
        height="18"
        stroke-width="2"
      >
        <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2"></path>{" "}
        <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>{" "}
        <path d="M14 4l0 4l-6 0l0 -4"></path>{" "}
      </svg>
      <span>저장</span>
    </button>
    {[1, 2, 3].map((type) => {
      const eventLength = eventData.filter(
        (obj) =>
          obj.btnType === type && obj.month === month && obj.year === year
      ).length;
      return (
        <button
          key={type}
          className={styles.btn}
          style={
            btnType === type
              ? {
                  color: `var(--my${
                    type === 1 ? "yellow" : type === 2 ? "green" : "blue"
                  })`,
                  fontWeight: 800,
                  transform: "scale(1.02)",
                }
              : {
                  color: `var(--my${
                    type === 1 ? "yellow" : type === 2 ? "green" : "blue"
                  })`,
                }
          }
          onClick={() => onBtnClick(type)}
        >
          ■ {type === 1 ? "카페" : type === 2 ? "외식" : "여행"}
          {eventLength === 0 ? "" : `(${eventLength})`}
        </button>
      );
    })}
  </div>
);

export default EventBtnBox;
