import React from "react";
import styles from "./accordian.module.css";

export const Accordian = ({ title, content, isOpen, onClick }) => {
  return (
    <div className={styles.accordionitem}>
      <button
        className={`${styles.accordionbutton} ${
          isOpen ? styles.buttonOpen : ""
        }`}
        onClick={onClick}
      >
        <span className={styles.accordiontitletext}>{title}</span>
        {/* <svg
          className={`${styles.accordionicon} ${
            isOpen ? styles.iconrotate : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg> */}
        {isOpen ? (
          <span className={styles.accordiontitleicon}>-</span>
        ) : (
          <span className={styles.accordiontitleicon}>+</span>
        )}
      </button>
      <div
        className={`${styles.accordioncontent} ${
          isOpen ? styles.contentopen : styles.contentclosed
        }`}
      >
        <div className={styles.accordioncontenttext}>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};
