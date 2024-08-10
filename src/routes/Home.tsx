import { useState } from "react";
import Calendar from "../components/calendar/Calendar";
import { IDateData } from "../components/calendar/CalendarBody";
import DateInfo from "../components/info/DateInfo";

const Home = () => {
  const [displayInfo, setDisplayInfo] = useState(false);
  const [clickedDate, setClickedDate] = useState<IDateData>();
  return (
    <>
      <Calendar
        setDisplayInfo={setDisplayInfo}
        setClickedDate={setClickedDate}
        clickedDate={clickedDate}
        displayInfo={displayInfo}
      />
      <DateInfo displayInfo={displayInfo} clickedDate={clickedDate} />
    </>
  );
};

export default Home;
