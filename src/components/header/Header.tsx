import React, { useEffect, useState } from "react";
import styles from "../../styles/header/header.module.css";

interface IHeaderProps {
  setDisplaySearch: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayReport: React.Dispatch<React.SetStateAction<boolean>>;
  getNotification: boolean;
  setGetNotification: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<IHeaderProps> = ({
  setDisplaySearch,
  setDisplayReport,
  getNotification,
  setGetNotification,
}) => {
  const today = () => {
    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth() + 1;
    const d = today.getDate();
    const koreanDay = ["일", "월", "화", "수", "목", "금", "토"][
      today.getDay()
    ];
    return `${y}. ${m}. ${d}. ${koreanDay}`;
  };
  const dday = () =>
    Math.ceil(
      (new Date().getTime() - new Date(2023, 5, 4).getTime()) /
        (1000 * 60 * 60 * 24)
    );

  return (
    <div className={styles.box}>
      <div className={styles.ddayBox}>
        <span className={styles.heart}>♥</span>
        <span className={styles.dday}>{dday()}</span>
      </div>
      <div className={styles.datebox}>
        <span className={styles.date}>{today()}</span>
      </div>
      <div className={styles.searchBox}>
        {/* {getNotification ? (
          <svg
            className={styles.btns}
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            onClick={() => setGetNotification((prev) => !prev)}
          >
            <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
            <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
            <path d="M21 6.727a11.05 11.05 0 0 0 -2.794 -3.727" />
            <path d="M3 6.727a11.05 11.05 0 0 1 2.792 -3.727" />
          </svg>
        ) : (
          <svg
            className={styles.btns}
            style={{ color: "rgba(0,0,0,0.3)" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            width="18"
            height="18"
            stroke-width="3"
            onClick={() => {
              setGetNotification((prev) => !prev);
            }}
          >
            <path d="M9.346 5.353c.21 -.129 .428 -.246 .654 -.353a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3m-1 3h-13a4 4 0 0 0 2 -3v-3a6.996 6.996 0 0 1 1.273 -3.707"></path>{" "}
            <path d="M9 17v1a3 3 0 0 0 6 0v-1"></path>{" "}
            <path d="M3 3l18 18"></path>{" "}
          </svg>
        )} */}
        <svg
          className={styles.btns}
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          onClick={() => setDisplayReport((prev) => !prev)}
        >
          <path d="M21 7l-18 0" />
          <path d="M18 10l3 -3l-3 -3" />
          <path d="M6 20l-3 -3l3 -3" />
          <path d="M3 17l18 0" />
        </svg>
        <svg
          className={styles.btns}
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          onClick={() => setDisplaySearch((prev) => !prev)}
        >
          <path d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z" />
        </svg>
      </div>
    </div>
  );
};

export default Header;
