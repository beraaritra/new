"use client";
import React, { useState } from "react";
import styles from "./faq.module.css";
import { Accordian } from "@/components/accordian/Accordian";
const accordionItems = [
  {
    title: "What services does Accio Finance offer? ",
    content:
      "At Accio Finance, we offer a wide range of accounting and bookkeeping services tailored to the needs of US and India-based companies. Our core services include Balance Sheet Reconciliations, Accounts Receivable and Payable Reconciliations, Bank Reconciliations, Tax Strategy Development, Financial Planning, and Business Advisory Services. We also provide customized support to ensure your financial records are accurate, compliant, and up-to-date. For more information please visit Our Services page.",
  },
  {
    title: "How can Accio Finance help my business grow?",
    content:
      "At Accio Finance, we offer a wide range of accounting and bookkeeping services tailored to the needs of US and India-based companies. Our core services include Balance Sheet Reconciliations, Accounts Receivable and Payable Reconciliations, Bank Reconciliations, Tax Strategy Development, Financial Planning, and Business Advisory Services. We also provide customized support to ensure your financial records are accurate, compliant, and up-to-date. For more information please visit Our Services page.",
  },
  {
    title: "What is the process for Balance Sheet Reconciliation?",
    content:
      "At Accio Finance, we offer a wide range of accounting and bookkeeping services tailored to the needs of US and India-based companies. Our core services include Balance Sheet Reconciliations, Accounts Receivable and Payable Reconciliations, Bank Reconciliations, Tax Strategy Development, Financial Planning, and Business Advisory Services. We also provide customized support to ensure your financial records are accurate, compliant, and up-to-date. For more information please visit Our Services page.",
  },
  {
    title: "What documents are required for Balance Sheet Reconciliation?",
    content:
      "At Accio Finance, we offer a wide range of accounting and bookkeeping services tailored to the needs of US and India-based companies. Our core services include Balance Sheet Reconciliations, Accounts Receivable and Payable Reconciliations, Bank Reconciliations, Tax Strategy Development, Financial Planning, and Business Advisory Services. We also provide customized support to ensure your financial records are accurate, compliant, and up-to-date. For more information please visit Our Services page.",
  },
  {
    title: "How do you handle Accounts Receivable and Payable Reconciliations?",
    content:
      "At Accio Finance, we offer a wide range of accounting and bookkeeping services tailored to the needs of US and India-based companies. Our core services include Balance Sheet Reconciliations, Accounts Receivable and Payable Reconciliations, Bank Reconciliations, Tax Strategy Development, Financial Planning, and Business Advisory Services. We also provide customized support to ensure your financial records are accurate, compliant, and up-to-date. For more information please visit Our Services page.",
  },
  {
    title:
      "What Documents are required for Accounts Receivable and Payable Reconciliations?",
    content:
      "At Accio Finance, we offer a wide range of accounting and bookkeeping services tailored to the needs of US and India-based companies. Our core services include Balance Sheet Reconciliations, Accounts Receivable and Payable Reconciliations, Bank Reconciliations, Tax Strategy Development, Financial Planning, and Business Advisory Services. We also provide customized support to ensure your financial records are accurate, compliant, and up-to-date. For more information please visit Our Services page.",
  },
  {
    title: "Why is Bank Reconciliation important for my business?",
    content:
      "At Accio Finance, we offer a wide range of accounting and bookkeeping services tailored to the needs of US and India-based companies. Our core services include Balance Sheet Reconciliations, Accounts Receivable and Payable Reconciliations, Bank Reconciliations, Tax Strategy Development, Financial Planning, and Business Advisory Services. We also provide customized support to ensure your financial records are accurate, compliant, and up-to-date. For more information please visit Our Services page.",
  },
  {
    title: "How do I get started with Accio Finance services?",
    content:
      "At Accio Finance, we offer a wide range of accounting and bookkeeping services tailored to the needs of US and India-based companies. Our core services include Balance Sheet Reconciliations, Accounts Receivable and Payable Reconciliations, Bank Reconciliations, Tax Strategy Development, Financial Planning, and Business Advisory Services. We also provide customized support to ensure your financial records are accurate, compliant, and up-to-date. For more information please visit Our Services page.",
  },
  {
    title: "How does Accio Finance ensure confidentiality?",
    content:
      "At Accio Finance, we offer a wide range of accounting and bookkeeping services tailored to the needs of US and India-based companies. Our core services include Balance Sheet Reconciliations, Accounts Receivable and Payable Reconciliations, Bank Reconciliations, Tax Strategy Development, Financial Planning, and Business Advisory Services. We also provide customized support to ensure your financial records are accurate, compliant, and up-to-date. For more information please visit Our Services page.",
  },
  {
    title: "How does Accio Finance ensure data privacy and security?",
    content:
      "At Accio Finance, we offer a wide range of accounting and bookkeeping services tailored to the needs of US and India-based companies. Our core services include Balance Sheet Reconciliations, Accounts Receivable and Payable Reconciliations, Bank Reconciliations, Tax Strategy Development, Financial Planning, and Business Advisory Services. We also provide customized support to ensure your financial records are accurate, compliant, and up-to-date. For more information please visit Our Services page.",
  },
  {
    title: "What are your pricing options?",
    content:
      "At Accio Finance, we offer a wide range of accounting and bookkeeping services tailored to the needs of US and India-based companies. Our core services include Balance Sheet Reconciliations, Accounts Receivable and Payable Reconciliations, Bank Reconciliations, Tax Strategy Development, Financial Planning, and Business Advisory Services. We also provide customized support to ensure your financial records are accurate, compliant, and up-to-date. For more information please visit Our Services page.",
  },
  {
    title:
      "What will happen to my documents after the assignment is completed?",
    content:
      "At Accio Finance, we offer a wide range of accounting and bookkeeping services tailored to the needs of US and India-based companies. Our core services include Balance Sheet Reconciliations, Accounts Receivable and Payable Reconciliations, Bank Reconciliations, Tax Strategy Development, Financial Planning, and Business Advisory Services. We also provide customized support to ensure your financial records are accurate, compliant, and up-to-date. For more information please visit Our Services page.",
  },
];

export const Faq = () => {
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
                Have Questions?
                <br />
                <span> We Have Answers!</span>
              </h1>

              <p>
                Explore our FAQs for quick, clear, and concise solutions to all
                your queries and concerns about us. Whether you &apos re a new
                visitor or our valued client, you &apos ll find everything you
                need to know right here.
              </p>
            </div>
            <div className={styles.heroimage}>
              <img src="/faqhero.svg" />
            </div>
          </div>
        </div>
      </section>
      <section className={styles.faqsec}>
        <div className="container mx-auto">
          <div className={styles.accordiansect}>
            <div className={styles.heading}>
              <h1>
                Frequently Asked <span>Questions</span>
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
      </section>
    </>
  );
};
export default Faq;
