import React, { ChangeEvent, useRef, useState } from "react";
import { IEventData } from "../../routes/Home";
import styles from "../../styles/search/search.module.css";

interface ISearchProps {
  eventData: IEventData[];
  displaySearch: boolean;
}

const Search: React.FC<ISearchProps> = ({ eventData, displaySearch }) => {
  const [result, setResult] = useState<IEventData[]>([]);

  const value = useRef("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    value.current = event.target.value;
    if (value.current) {
      const filteredArr = eventData.filter((obj) =>
        obj.eventValue?.includes(value.current)
      );
      setResult(filteredArr);
    } else {
      setResult([]);
    }
  };

  return (
    <div
      className={
        displaySearch
          ? `${styles.container}`
          : `${styles.container} ${styles.hidden}`
      }
      style={result.length === 0 && displaySearch ? { height: "65px" } : {}}
    >
      <div className={styles.inputBox}>
        <input
          type="text"
          value={value.current}
          onChange={onChange}
          className={styles.input}
          placeholder="무엇을 먹고 어떻게 놀았는지 찾아보세요."
        />
      </div>

      <div
        className={styles.resultContainer}
        style={result.length === 0 ? { display: "none" } : {}}
      >
        <div className={styles.resultBox}>
          {result
            .sort(
              (b, a) =>
                new Date(a.year, a.month, a.date).getTime() -
                new Date(b.year, b.month, b.date).getTime()
            )
            .map((result) => (
              <div key={result.id} className={styles.resultItem}>
                <div
                  style={
                    result.btnType === 1
                      ? { backgroundColor: "var(--myyellow)" }
                      : result.btnType === 2
                      ? { backgroundColor: "var(--mygreen)" }
                      : { backgroundColor: "var(--myblue)" }
                  }
                  className={styles.resultType}
                ></div>
                <div className={styles.resultEvent}>{result.eventValue}</div>
                <span className={styles.resultDate}>
                  {result.year}. {result.month}. {result.date}
                </span>
              </div>
            ))}
        </div>
        <div className={styles.resultInfo}>
          <span>정렬기준: 최신순</span>
          <span>
            이벤트 <strong style={{ fontWeight: 800 }}>{result.length}</strong>
            건을 찾았습니다.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Search;
