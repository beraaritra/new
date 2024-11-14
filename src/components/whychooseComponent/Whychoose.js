"use client";
import React, { useState } from "react";
import styles from "./Whychoose.module.css";
import { Accordian } from "../accordian/Accordian";
const accordionItems = [
  {
    title: "A team of 200+ US accounting professionals",
    content:
      "dedicated to providing personalized support, so you always have a trusted partner by your side when making financial decision",
  },
  {
    title: "Secure & Compliant ",
    content:
      "dedicated to providing personalized support, so you always have a trusted partner by your side when making financial decision",
  },
  {
    title: "Transparent Pricing",
    content:
      "dedicated to providing personalized support, so you always have a trusted partner by your side when making financial decision",
  },
];

export const Whychoose = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const handleItemClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <section className={styles.Whychoosesec}>
      <div className="container mx-auto">
        <div className={styles.mainwrapper}>
          <div className={styles.image}>
            <img src="/choose.png" />
          </div>

          <div className={styles.accordiansect}>
            <div className={styles.heading}>
              <h1>
                Why <span>Choose us</span>
              </h1>
            </div>
            <div className={styles.choose}>
              {accordionItems.map((item, index) => (
                <Accordian
                  key={index}
                  title={item.title}
                  content={item.content}
                  isOpen={openIndex === index}
                  onClick={() => handleItemClick(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
