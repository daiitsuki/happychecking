import React, { ChangeEvent, useEffect, useState } from "react";
import { IDateData } from "../calendar/CalendarBody";
import styles from "../../styles/info/dateInfo.module.css";
import { IEventData } from "../../routes/Home";

interface IDateInfoProps {
  eventData: IEventData[];
  setEventData: React.Dispatch<React.SetStateAction<IEventData[]>>;
  displayInfo: boolean;
  setDisplayInfo: React.Dispatch<React.SetStateAction<boolean>>;
  clickedDate: IDateData | undefined;
  setClickedDate: React.Dispatch<React.SetStateAction<IDateData | undefined>>;
}

const DateInfo: React.FC<IDateInfoProps> = ({
  eventData,
  setEventData,
  displayInfo,
  setDisplayInfo,
  clickedDate,
  setClickedDate,
}) => {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");

  useEffect(() => {
    if (clickedDate) {
      [1, 2, 3].map((n) => {
        const obj = eventData.find(
          (obj) => obj.id === `${clickedDate.ymd}_${n}`
        );
        const value = obj?.eventValue ? obj.eventValue : "";
        n === 1
          ? setValue1(value)
          : n === 2
          ? setValue2(value)
          : setValue3(value);
        return n;
      });
    }
  }, [eventData, clickedDate]);

  const changeEventData = (n: number) => {
    if (clickedDate) {
      const obj = eventData.find((obj) => obj.id === `${clickedDate.ymd}_${n}`);
      if (obj) {
        obj.eventValue = n === 1 ? value1 : n === 2 ? value2 : value3;
      }
      setEventData(eventData);
    }
  };

  const infoTitle = () => (
    <>
      <div className={styles.title}>
        {clickedDate
          ? `${clickedDate.year}. ${clickedDate.month}. ${clickedDate.date}`
          : ""}
      </div>
      <button
        className={styles.closeBtn}
        onClick={() => {
          setDisplayInfo((prev) => !prev);
          setClickedDate(undefined);
        }}
      >
        ▲
      </button>
    </>
  );

  const infoContent = () => {
    if (clickedDate) {
      return [1, 2, 3].map((n) => {
        const color =
          n === 1
            ? "var(--myyellow)"
            : n === 2
            ? "var(--mygreen)"
            : "var(--myblue)";

        const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
          n === 1
            ? setValue1(event.target.value)
            : n === 2
            ? setValue2(event.target.value)
            : setValue3(event.target.value);
        };

        return (
          <div
            key={n}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={
                clickedDate?.event?.includes(n)
                  ? { color, fontWeight: 800 }
                  : { color: "var(--mygray)" }
              }
            >
              ■ {n === 1 ? "카페" : n === 2 ? "외식" : "거금"}
            </span>
            <input
              type="text"
              className={styles.contentInput}
              name={`input${n}`}
              id={`${n}`}
              value={n === 1 ? value1 : n === 2 ? value2 : value3}
              onChange={onTextChange}
              onBlur={() => {
                changeEventData(n);
              }}
              disabled={!clickedDate.event?.includes(n)}
              placeholder={"어디에 다녀왔나요?"}
            />
          </div>
        );
      });
    }
  };

  return (
    <div
      className={
        displayInfo ? styles.infoBox : `${styles.infoBox} ${styles.hidden}`
      }
    >
      <div className={styles.titleBox}>{infoTitle()}</div>
      <div className={styles.content}>{infoContent()}</div>
      <span className={styles.infoCaution}>
        ※ 변경 사항을 반영하려면{" "}
        <strong style={{ fontWeight: 800, color: "var(--mygray)" }}>
          저장
        </strong>{" "}
        버튼을 클릭하세요.
      </span>
    </div>
  );
};

export default DateInfo;
