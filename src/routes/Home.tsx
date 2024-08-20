import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Calendar from "../components/calendar/Calendar";
import { IDateData } from "../components/calendar/CalendarBody";
import Header from "../components/header/Header";
import DateInfo from "../components/info/DateInfo";
import { dbService } from "../firebase";

// IEventData는 Firebase Database에 저장되는 부분이므로
// 되도록이면 변경하지 말 것. 오류 예방
export interface IEventData {
  year: number;
  month: number;
  date: number;
  btnType: number;
  id: string;
  eventValue?: string;
}

const Home = () => {
  const [displayInfo, setDisplayInfo] = useState(false);
  const [clickedDate, setClickedDate] = useState<IDateData>();
  const [eventData, setEventData] = useState<IEventData[]>([]);

  const getData = async () => {
    const docRef = doc(dbService, "data", "eventdata");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setEventData(data.eventData);
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

  useEffect(() => {
    //
    // 배포 시에 주석 해제
    // 배포 시에 주석 해제
    getData();
    // 배포 시에 주석 해제
    // 배포 시에 주석 해제
    //
  }, []);
  return (
    <>
      <Header />
      <Calendar
        eventData={eventData}
        setEventData={setEventData}
        dataSave={dataSave}
        clickedDate={clickedDate}
        setClickedDate={setClickedDate}
        displayInfo={displayInfo}
        setDisplayInfo={setDisplayInfo}
      />
      <DateInfo
        eventData={eventData}
        setEventData={setEventData}
        clickedDate={clickedDate}
        setClickedDate={setClickedDate}
        displayInfo={displayInfo}
        setDisplayInfo={setDisplayInfo}
      />
    </>
  );
};

export default Home;
