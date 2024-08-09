import React from "react";
import styles from "../../styles/calendar/calendarBody.module.css";

interface IEventBtnBoxProps {
  btnType?: number;
  onBtnClick: (btnId: number) => void;
  dataSave: () => void;
}

const EventBtnBox: React.FC<IEventBtnBoxProps> = ({
  btnType,
  onBtnClick,
  dataSave,
}) => (
  <div className={styles.btnBox}>
    <button className={`${styles.btn} ${styles.save}`} onClick={dataSave}>
      저장
    </button>
    {[1, 2, 3].map((type) => (
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
      </button>
    ))}
  </div>
);

export default EventBtnBox;
