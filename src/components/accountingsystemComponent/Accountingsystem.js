import React from "react";
import styles from "./accountingsystem.module.css";

export const Accountingsystem = () => {
  return (
    <section className={styles.accountingsystem}>
      <div className="container mx-auto">
        <div className={styles.heading}>
          <h1>
            Accounting <span>Systems</span>
          </h1>
        </div>
        <div className={styles.logowrap}>
          <div className={styles.logo}>
            <img src="/a1.svg" />
          </div>
          <div className={styles.logo}>
            <img src="/a2.svg" />
          </div>
          <div className={styles.logo}>
            <img src="/a3.svg" />
          </div>
          <div className={styles.logo}>
            <img src="/a4.svg" />
          </div>
        </div>
        <div className={styles.subheading}>
          <h2>AUTOMATION ADD-ONS </h2>
        </div>
        <div className={styles.logowrap}>
          <div className={styles.logo}>
            <img src="/a5.svg" />
          </div>
          <div className={styles.logo}>
            <img src="/a6.svg" />
          </div>
          <div className={styles.logo}>
            <img src="/a7.svg" />
          </div>
          <div className={styles.logo}>
            <img src="/a8.svg" />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Accountingsystem;
