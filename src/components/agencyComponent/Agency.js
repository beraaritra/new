import React from "react";
import styles from "./Agency.module.css";

export const Agency = () => {
  return (
    <section className={styles.agencysec}>
      <div className="container mx-auto">
        <div className={styles.agencywrap}>
          <div className={styles.image}>
            <img src="/agency.svg"></img>
          </div>
          <div className={styles.content}>
            <h1>
              We work with experienced professionals who are Top Rated on
              Upwork!
            </h1>
            <p>Our Agency links:</p>
            <div className={styles.btnwrap}>
              <button type="button">
                <img src="/alogo.svg" />
                Outsource 360 Business Solutions
              </button>
              <button type="button">
                <img src="/alogo2.svg" />
                LawSikho Freelancing
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Agency;
