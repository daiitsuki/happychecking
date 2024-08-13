import React from "react";
import { IEventData } from "../../routes/Home";
import styles from "../../styles/calendar/calendarBody.module.css";

interface IEventBtnBoxProps {
  btnType?: number;
  eventData: IEventData[];
  onBtnClick: (btnId: number) => void;
  dataSave: () => void;
  month: number;
}

const EventBtnBox: React.FC<IEventBtnBoxProps> = ({
  btnType,
  eventData,
  onBtnClick,
  dataSave,
  month,
}) => (
  <div className={styles.btnBox}>
    <button className={`${styles.btn} ${styles.save}`} onClick={dataSave}>
      저장
    </button>
    {[1, 2, 3].map((type) => {
      const eventLength = eventData.filter(
        (obj) => obj.btnType === type && obj.month === month
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
          ■ {type === 1 ? "카페" : type === 2 ? "외식" : "거금"}
          {eventLength === 0 ? "" : `(${eventLength})`}
        </button>
      );
    })}
  </div>
);

export default EventBtnBox;
