import React from "react";
import styles from "./freecall.module.css";

export const Freecall = () => {
  return (
    <section className={styles.Freecallsec}>
      <div className="container mx-auto">
        <div className={styles.agencywrap}>
          <div className={styles.content}>
            <h1>
              Your Journey Towards Error-Free Books of Accounts Starts Today!
            </h1>
            <p>
              To help you achieve your desired financial goals, we would like to
              know more about your business!
            </p>
            <div className={styles.btnwrap}>
              <button type="button">
                <img src="/call.svg" />
                Book A Call
              </button>
            </div>
          </div>
          <div className={styles.image}>
            <img src="/freecall.svg"></img>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Freecall;
