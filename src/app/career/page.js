"use client";
import React, { useState } from "react";
import styles from "./career.module.css";
import { Accordian } from "@/components/accordian/Accordian";
const accordionItems = [
  {
    title: "A Culture of Excellence:",
    content:
      "We foster a collaborative and supportive work environment where individuals can thrive and grow professionally.",
  },
  {
    title: "Opportunities for Growth",
    content:
      "dedicated to providing personalized support, so you always have a trusted partner by your side when making financial decision",
  },
  {
    title: "Cutting-Edge Technology",
    content:
      "dedicated to providing personalized support, so you always have a trusted partner by your side when making financial decision",
  },
  {
    title: "Impactful Work",
    content:
      "dedicated to providing personalized support, so you always have a trusted partner by your side when making financial decision",
  },
  {
    title: "A Supportive Team",
    content:
      "dedicated to providing personalized support, so you always have a trusted partner by your side when making financial decision",
  },
];

export const Career = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const handleItemClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  React.useEffect(() => {
    if (openIndex === null) setOpenIndex(0);
  }, [openIndex]);
  return (
    <>
      <section className={styles.herosection}>
        <div class="container mx-auto">
          <div className={styles.bannerwrap}>
            <div className={styles.content}>
              <h1>
                Where Dreams
                <span>Take Flight</span>
              </h1>
              <p>
                At Accio Finance, we &apos re passionate about helping US-based
                businesses achieve their financial goals. Our team of dedicated
                professionals provides expert accounting and bookkeeping
                services, along with a full suite of support and advisory
                services. At the core of our success is our people. We are a
                diverse and talented group of individuals who are passionate
                about delivering exceptional results. Our collaborative culture
                and commitment to professional development create a dynamic and
                rewarding work environment.
              </p>
              <p>
                Together, we can achieve more. Let &apos s embark on a journey
                of transformation and innovation. Join Accio Finance today and
                unleash your potential.
              </p>
            </div>
            <div className={styles.heroimage}>
              <img src="/careerhero.png" />
            </div>
          </div>
        </div>
      </section>
      <section className={styles.Whychoosesec}>
        <div className="container mx-auto">
          <div className={styles.mainwrapper}>
            <div className={styles.image}>
              <img src="/choose.png" />
            </div>

            <div className={styles.accordiansect}>
              <div className={styles.heading}>
                <h1>
                  Why Choose <span>Accio Finance?</span>
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
      <section className={styles.joiningformsec}>
        <div className="container mx-auto">
          <div className={styles.heading}>
            <h1>
              Join our team and and experience the difference
              <br />
              <span>with Accio Finance &apos</span>
            </h1>
          </div>
          <div className={styles.mainwrapper}>
            <div className={styles.joinwrap}>
              <div className={styles.heading}>
                <h4>Ready To Join</h4>
                <p>Specimen Content for Form:</p>
              </div>
              <div className={styles.formwrapper}>
                <form>
                  <div className={styles.wraping}>
                    <div className={styles.form}>
                      <label>Name</label>
                      <input type="text" placeholder="" />
                    </div>
                    <div className={styles.form}>
                      <label>Email</label>
                      <input type="text" placeholder="" />
                    </div>
                  </div>
                  <div className={styles.wraping}>
                    <div className={styles.form}>
                      <label>Year of Experience</label>
                      <select>
                        <option>--Select--</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                    <div className={styles.form}>
                      <label>Phone</label>
                      <div className={styles.phonewrap}>
                        <select>
                          <option>+91(IN)</option>
                          <option>+91(IN)</option>
                          <option>+91(IN)</option>
                        </select>
                        <input type="text" placeholder="Phone No" />
                      </div>
                    </div>
                  </div>
                  <div className={styles.wraping}>
                    <div className={styles.form}>
                      <label>Position:</label>
                      <select>
                        <option>--Select--</option>
                        <option>option 1</option>
                        <option>option 2</option>
                        <option>option3</option>
                        <option> option 4</option>
                        <option>option 5</option>
                      </select>
                    </div>
                    <div className={styles.form}>
                      <label>Department:</label>
                      <select>
                        <option>--Select--</option>
                        <option>option 1</option>
                        <option>option2</option>
                        <option>option3</option>
                        <option>option 4</option>
                        <option>option 5</option>
                      </select>
                    </div>
                  </div>
                  <div className={styles.wraping}>
                    <div className={styles.form}>
                      <label>Message:</label>
                      <textarea placeholder=""></textarea>
                    </div>
                  </div>
                  <div className={styles.wraping}>
                    <div className={styles.form}>
                      <label>CV:</label>
                      <div className={styles.uploadresume}>
                        <div className={styles.resumewrap}>
                          <span className={styles.uploadbutton}>
                            Upload resume
                          </span>
                          <input type="file" className={styles.uploadinput} />
                        </div>
                        <p>Support format: docs, docx, rtf, pdf up to 2MB</p>
                      </div>
                    </div>
                  </div>
                  <div className={styles.buttonwrap}>
                    <button type="button">Submit </button>
                  </div>
                </form>
              </div>
            </div>
            <div className={styles.image}>
              <img src="/about.png" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Career;
