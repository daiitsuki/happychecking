import React from "react";
import { IDateData } from "../calendar/CalendarBody";

interface IDateInfoProps {
  displayInfo: boolean;
  clickedDate: IDateData | undefined;
}

const DateInfo: React.FC<IDateInfoProps> = ({ displayInfo, clickedDate }) => {
  return (
    <div style={displayInfo ? {} : { display: "none" }}>
      {clickedDate
        ? `${clickedDate.year} ${clickedDate.month} ${clickedDate.date}
        ${clickedDate.event?.length}건의 이벤트가 있습니다.
        `
        : ""}
    </div>
  );
};

export default DateInfo;
