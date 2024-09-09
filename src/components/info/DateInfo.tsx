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
  const [values, setValues] = useState<string[]>(["", "", ""]);
  const [isActive, setIsActive] = useState<boolean[]>([false, false, false]);
  useEffect(() => {
    if (clickedDate) {
      const updatedValues = [1, 2, 3].map((n) => {
        const obj = eventData.find(
          (obj) => obj.id === `${clickedDate.ymd}_${n}`
        );
        return obj?.eventValue || "";
      });
      setValues(updatedValues);
    }
  }, [eventData, clickedDate]);

  useEffect(() => {
    if (clickedDate) {
      const updatedIsActive = [1, 2, 3].map((index) =>
        eventData.some((obj) => obj.id === `${clickedDate.ymd}_${index}`)
      );
      setIsActive(updatedIsActive);
    }
  }, [eventData, clickedDate]);

  const changeEventData = (index: number) => {
    if (clickedDate) {
      const objIndex = eventData.findIndex(
        (obj) => obj.id === `${clickedDate.ymd}_${index}`
      );
      if (objIndex !== -1) {
        const updatedEventData = [...eventData];
        updatedEventData[objIndex] = {
          ...updatedEventData[objIndex],
          eventValue: values[index - 1],
        };
        setEventData(updatedEventData);
      }
    }
  };

  const koreanDay = (ymd: string) => {
    const [year, month, day] = ymd.split("_").map(Number);
    return ["일", "월", "화", "수", "목", "금", "토"][
      new Date(year, month - 1, day).getDay()
    ];
  };

  const handleInputChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newValues = [...values];
    newValues[index - 1] = event.target.value;
    setValues(newValues);
  };

  const renderInputFields = () => {
    return [1, 2, 3].map((n) => {
      const color =
        n === 1
          ? "var(--myyellow)"
          : n === 2
          ? "var(--mygreen)"
          : "var(--myblue)";

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
            style={{
              color: isActive[n - 1] ? color : "var(--mygray)",
              fontWeight: isActive[n - 1] ? 800 : undefined,
              cursor: "pointer",
            }}
            onClick={() => {
              if (clickedDate) {
                const clickedData: IEventData = {
                  year: clickedDate.year,
                  month: clickedDate.month,
                  date: clickedDate.date,
                  btnType: n,
                  id: `${clickedDate.ymd}_${n}`,
                };
                if (eventData.some((obj) => obj.id === clickedData.id)) {
                  const filteredArr = eventData.filter(
                    (obj) => obj.id !== clickedData.id
                  );
                  setEventData(filteredArr);
                  setIsActive((prev) => {
                    const updatedIsActive = [...prev];
                    updatedIsActive[n - 1] = false;
                    return updatedIsActive;
                  });
                } else {
                  setIsActive((prev) => {
                    const updatedIsActive = [...prev];
                    updatedIsActive[n - 1] = true;
                    return updatedIsActive;
                  });
                  setEventData((prev) => [...prev, clickedData]);
                }
              }
            }}
          >
            ■ {n === 1 ? "카페" : n === 2 ? "외식" : "거금"}
          </span>
          <input
            type="text"
            className={styles.contentInput}
            value={values[n - 1]}
            onChange={(event) => handleInputChange(n, event)}
            onBlur={() => changeEventData(n)}
            disabled={!isActive[n - 1]}
            placeholder="어디에 다녀왔나요?"
          />
        </div>
      );
    });
  };

  return (
    <div
      className={
        displayInfo ? styles.infoBox : `${styles.infoBox} ${styles.hidden}`
      }
    >
      <div className={styles.titleBox}>
        <div className={styles.title}>
          {clickedDate
            ? `${clickedDate.year}. ${clickedDate.month}. ${
                clickedDate.date
              }. ${koreanDay(clickedDate.ymd)}`
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
      </div>
      <div className={styles.content}>{clickedDate && renderInputFields()}</div>
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
