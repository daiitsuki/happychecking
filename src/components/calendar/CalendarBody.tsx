import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "../../firebase";
import styles from "../../styles/calendar/calendarBody.module.css";
import DateBox from "./DateBox";
import EventBtnBox from "./EventBtnBox";

interface ICalendarProps {
  year: number;
  month: number;
}

interface IDateData {
  year: number;
  month: number;
  date: number;
  currentMonth: boolean;
  event?: number[];
}

interface IBtnClicked {
  clicked: boolean;
  btnType?: number;
}

interface IEventData {
  year: number;
  month: number;
  date: number;
  btnType: number;
  id: string;
}

export default function CalendarBody({ year, month }: ICalendarProps) {
  const [btnClicked, setBtnClicked] = useState<IBtnClicked>({ clicked: false });
  const [eventData, setEventData] = useState<IEventData[]>([]);

  const getData = async () => {
    const docRef = doc(dbService, "data", "eventdata");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setEventData(data.eventData);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const colorMap = [
      "var(--backgray)",
      "var(--lightyellow)",
      "var(--lightgreen)",
      "var(--lightblue)",
    ];
    document.documentElement.style.setProperty(
      "--overlayColor",
      colorMap[btnClicked.btnType || 0]
    );
  }, [btnClicked]);

  const dayOfFirstDate = () => new Date(year, month - 1, 1).getDay();
  const dayOfLastDate = () =>
    new Date(year, month - 1, lastDate(year, month)).getDay();
  const lastDate = (y: number, m: number) => {
    if (m <= 0) {
      y = y - 1;
      m = 12 + m;
    }
    if (m >= 13) {
      y = y + 1;
      m = m - 12;
    }
    let arrLastDate = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (y % 4 === 0) {
      // 윤년일 경우 2월 29일 처리
      arrLastDate[1] = 29;
    }
    return arrLastDate[m - 1];
  };

  const eventCheck = (y: number, m: number, d: number) => {
    const eventIds = [1, 2, 3];
    const event: number[] = [];

    for (const id of eventIds) {
      if (eventData.some((obj) => obj.id === `${y}_${m}_${d}_${id}`)) {
        event.push(id);
      }
    }

    return event.length > 0 ? event : undefined;
  };

  const renderCalendar = () => {
    let array: IDateData[] = [];
    // 이전 달 날짜 추가
    for (let i = 1; i <= dayOfFirstDate(); i++) {
      let y = year;
      let m = month - 1;
      let d = lastDate(y, m - 1) - (dayOfFirstDate() - i);
      if (month === 1) {
        y = y - 1;
        m = 12;
      }
      array.push({
        year: y,
        month: m,
        date: d,
        currentMonth: false,
        event: eventCheck(y, m, d),
      });
    }
    // 현재 달 날짜 추가
    for (let i = 1; i <= lastDate(year, month); i++) {
      array.push({
        year,
        month,
        date: i,
        currentMonth: true,
        event: eventCheck(year, month, i),
      });
    }
    // 다음 달 날짜 추가
    for (let i = 1; i <= 6 - dayOfLastDate(); i++) {
      let y = year;
      let m = month + 1;
      if (month === 12) {
        y = y + 1;
        m = 1;
      }
      array.push({
        year: y,
        month: m,
        date: i,
        currentMonth: false,
        event: eventCheck(y, m, i),
      });
    }
    return array;
  };

  const eventBtnClick = (btnId: number) => {
    if (btnClicked.clicked === true && btnClicked.btnType === btnId) {
      setBtnClicked({ clicked: false });
      return;
    }
    setBtnClicked({ clicked: true, btnType: btnId });
  };

  const dateClick = (year: number, month: number, date: number) => {
    if (btnClicked.clicked && btnClicked.btnType) {
      const clickedData: IEventData = {
        year,
        month,
        date,
        btnType: btnClicked.btnType,
        id: `${year}_${month}_${date}_${btnClicked.btnType}`,
      };
      if (eventData.some((obj) => obj.id === clickedData.id)) {
        const filteredArr = eventData.filter(
          (obj) => obj.id !== clickedData.id
        );
        setEventData(filteredArr);
      } else {
        setEventData((prev) => [...prev, clickedData]);
      }
      console.log(eventData);
    }
  };

  const dataSave = async () => {
    const shouldDataSave = window.confirm("변경 사항을 저장할까요?");
    if (!shouldDataSave) {
      return;
    }
    const docRef = doc(dbService, "data", "eventdata");
    await setDoc(docRef, { eventData });
    alert("변경 사항이 저장되었습니다.");
  };

  return (
    <div className={styles.bodyBox}>
      <div
        className={
          btnClicked.clicked
            ? `${styles.dateBox} ${styles.filled}`
            : `${styles.dateBox} ${styles.unfilled}`
        }
      >
        {renderCalendar().map((n) => {
          const isActive =
            btnClicked.btnType && n.event?.includes(btnClicked.btnType);

          return (
            <DateBox
              key={`${n.year}_${n.month}_${n.date}`}
              year={n.year}
              month={n.month}
              date={n.date}
              currentMonth={n.currentMonth}
              event={n.event}
              btnType={btnClicked.btnType}
              btnClicked={btnClicked.clicked}
              onDateClick={() =>
                n.currentMonth && dateClick(n.year, n.month, n.date)
              }
              isActive={isActive}
            />
          );
        })}
      </div>
      <EventBtnBox
        btnType={btnClicked.btnType}
        onBtnClick={eventBtnClick}
        dataSave={dataSave}
      />
    </div>
  );
}
