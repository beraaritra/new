"use client"; // This is a client component 👈🏽
import React, { useState } from "react";
import styles from "./Service.module.css";
import service_one from "../../../public/services-icon-1.svg";
import Modal from "react-modal";
import { useSearchParams, usePathname } from "next/navigation";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import styled from "styled-components";
import countries from "../../../libs/countries";
import validateName from "@/common/validateName";
import validateEmail from "@/common/validateEmail";
import validatePhone from "@/common/validatePhone";
import Script from "next/script";

const Service = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [navbar, setNavbar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalView, setModalView] = useState("form");
  const pathname = usePathname();
  console.log("Current pathname:", pathname);
  const searchParams = useSearchParams();

  const source = searchParams.get("p_source");
  const utm_source = searchParams.get("utm_source");
  const utm_medium = searchParams.get("utm_medium");
  const utm_campaign = searchParams.get("utm_campaign");
  const utm_content = searchParams.get("utm_content");

  console.log("source", source);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "",
    phone: "",
    source: source || "AccioFinance",
    utm_source: utm_source || null,
    utm_medium: utm_medium || null,
    utm_campaign: utm_campaign || null,
    utm_content: utm_content || null,
  });
  const clearValidationMessage = (fieldName) => {
    setValidationErrors((prevErrors) => {
      // Create a copy of the previous validation errors object
      const newErrors = { ...prevErrors };
      // Clear the error message for the specified field
      delete newErrors[fieldName];
      return newErrors;
    });
  };

  // const clearValidationMessage = (fieldName) => {
  //     setValidationErrors((prevErrors) => {
  //         // Create a copy of the previous validation errors object
  //         const newErrors = { ...prevErrors };
  //         // Clear the error message for the specified field
  //         delete newErrors[fieldName];
  //         return newErrors;
  //     });
  // };
  const handleCountryCodeChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setFormData((prevFormData) => ({
      ...prevFormData,
      countryCode: selectedOption.value,
    }));

    // Clear the validation message for the "Country Code" field
    clearValidationMessage("countryCode");
  };

  // const handleChange = (e) => {
  //     const { name, value, type, checked } = e.target;
  //     setFormData({
  //         ...formData,
  //         [name]: type === 'checkbox' ? checked : value,
  //     });
  // };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "wantDemo" && !checked) {
      // If wantDemo is unchecked, clear the scheduleDate value
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
        scheduleDate: "", // Clear scheduleDate
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }

    // Clear the validation message for the current input field
    clearValidationMessage(name);
  };

  const handleSubmit = async (e) => {
    console.log("clicked");
    e.preventDefault();
    // Disable the submit button while submitting
    setIsSubmitting(true);
    // Validate phone number
    // if (!validatePhoneNumber(formData.phone)) {
    //     setValidationErrors({ ...validationErrors, phone: 'Invalid phone number format. Please use digits and spaces.' });
    //     return;
    // }

    // Check if any required fields are empty
    const requiredFields = ["name", "email", "countryCode", "phone"];
    const newErrors = {};
    for (const field of requiredFields) {
      if (!formData[field]) {
        newErrors[field] = `Please fill in the ${field} field.`;
      }
    }

    // Validate the name field to ensure it doesn't contain numbers
    if (formData.name && !validateName(formData.name)) {
      newErrors.name = "Name cannot contain numbers or special characters.";
    }

    // Validate the email field
    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Validate the email phone
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    // If there are validation errors, set them in the state
    if (Object.keys(newErrors).length > 0) {
      setValidationErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    // If no errors, continue with form submission
    setValidationErrors({}); // Clear any previous errors

    try {
      await JSON.stringify(formData);
      console.log(formData);

      console.log(process.env.API_BASE_URL);
      const response = await axios.post(`/api/v1/lead/bookcall`, formData);

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "ec_form_submit",
        user_data: {
          email: formData.email,
          phone_number: '+'+formData.countryCode+formData.phone,
        },
      });
      setFormData({
        name: "",
        email: "",
        countryCode: "",
        phone: "",
      });

      setSelectedOption(null);
      // Redirect to the "Thank you" page
      setModalView("thankYou"); // Switch to thank you view
      setIsSubmitting(false);
      console.log("API Response:", response.data);
    } catch (error) {
      // Handle API request error (e.g., show an error message)
      console.error("API Request Error:", error);
      toast.error(error.response?.data?.message || error.message);
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false); // Re-enable the submit button after submission
    }
  };

  function openModal() {
    setIsOpen(true);
    setModalView("form");
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
    setFormData({
      name: "",
      email: "",
      countryCode: "",
      phone: "",
    });
    setSelectedOption(null);
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const [isExpanded, setIsExpanded] = useState({
    service1: false,
    service2: false,
    service3: false,
  });

  const handleToggle = (service) => {
    setIsExpanded((prev) => ({
      ...prev,
      [service]: !prev[service],
    }));
  };

  return (
    <section id="services_section">
      <div className={styles.service_section}>
        <div className={styles.service_bg}></div>
        <div className="container mx-auto">
          <h2>Our Services</h2>
          <div className={styles.service_row1}>
            <h3>Balance sheet Reconciliations</h3>
            <p>
              Our balance sheet reconciliation services ensure that your
              financial statements accurately reflect your company&#39;s
              financial position. Our team will meticulously verify and match
              your account balances, identify discrepancies, and make necessary
              adjustments to maintain the integrity of your financial reporting.
            </p>
            {isExpanded.service1 && (
              <div className={styles.service_expand}>
                <h4>Our services would typically involve the following:</h4>
                <div className="flex justify-center">
                  <div className="w-1/3 px-2 mb-4">
                    <div className={styles.service_card}>
                      <div className={styles.card_bg}>
                        <img
                          src="/service1-bg.svg"
                          alt="Icon"
                          className={styles.card_icon}
                        />
                      </div>
                      <div className={styles.card_img}>
                        <img
                          src="/service1.svg"
                          alt="Icon"
                          className={styles.card_icon}
                        />
                      </div>
                      <div className={styles.card_heading}>Data Gathering:</div>
                      <div className={styles.card_content}>
                        Our reconciliation specialists will collect financial
                        records from your company&#39;s general ledger, bank
                        statements, and other sources.
                      </div>
                    </div>
                  </div>
                  <div className="w-1/3 px-2 mb-4">
                    <div className={styles.service_card}>
                      <div className={styles.card_bg}>
                        <img
                          src="/service2-bg.svg"
                          alt="Icon"
                          className={styles.card_icon}
                        />
                      </div>
                      <div className={styles.card_img}>
                        <img
                          src="/service2.svg"
                          alt="Icon"
                          className={styles.card_icon}
                        />
                      </div>
                      <div className={styles.card_heading}>
                        Comparison and Analysis:
                      </div>
                      <div className={styles.card_content}>
                        They will meticulously compare these records,
                        identifying discrepancies between your internal books
                        and external statements.
                      </div>
                    </div>
                  </div>
                  <div className="w-1/3 px-2 mb-4">
                    <div className={styles.service_card}>
                      <div className={styles.card_bg}>
                        <img
                          src="/service3-bg.svg"
                          alt="Icon"
                          className={styles.card_icon}
                        />
                      </div>
                      <div className={styles.card_img}>
                        <img
                          src="/service3.svg"
                          alt="Icon"
                          className={styles.card_icon}
                        />
                      </div>
                      <div className={styles.card_heading}>
                        Discrepancy Resolution:
                      </div>
                      <div className={styles.card_content}>
                        The team works with you to understand and resolve any
                        discrepancies. This involves researching missing
                        invoices, uncashed checks, or bank errors.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-1/3 px-2 mb-4">
                    <div className={styles.service_card}>
                      <div className={styles.card_bg}>
                        <img
                          src="/service4-bg.svg"
                          alt="Icon"
                          className={styles.card_icon}
                        />
                      </div>
                      <div className={styles.card_img}>
                        <img
                          src="/service4.svg"
                          alt="Icon"
                          className={styles.card_icon}
                        />
                      </div>
                      <div className={styles.card_heading}>
                        Journal Entry Creation:
                      </div>
                      <div className={styles.card_content}>
                        Once discrepancies are addressed, our experts will pass
                        journal entries to adjust your general ledger, ensuring
                        accurate financial reporting.
                      </div>
                    </div>
                  </div>
                  <div className="w-1/3 px-2 mb-4">
                    <div className={styles.service_card}>
                      <div className={styles.card_bg}>
                        <img
                          src="/service5-bg.svg"
                          alt="Icon"
                          className={styles.card_icon}
                        />
                      </div>
                      <div className={styles.card_img}>
                        <img
                          src="/service5.svg"
                          alt="Icon"
                          className={styles.card_icon}
                        />
                      </div>
                      <div className={styles.card_heading}>
                        Documentation and Reporting:
                      </div>
                      <div className={styles.card_content}>
                        At the end, a clear and concise report detailing the
                        reconciliation process, identified discrepancies and any
                        adjustments made is provided.
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.service_section2}>
                  <h2>Here is why you should choose our services:</h2>
                  <div className="flex">
                    <div className="w-1/2 px-4 border_rght">
                      <div className={styles.section2_col1}>
                        <h3>
                          <img
                            src="/checkblue.svg"
                            alt="Icon"
                            className={styles.service2_icon}
                          />
                          <span>Enhanced Accuracy:</span>
                        </h3>
                        <p>
                          Regular reconciliation minimizes errors and ensures
                          your balance sheet reflects a true picture of your
                          financial health. By regularly reconciling your
                          balance sheet accounts, we help prevent and correct
                          errors that could impact your financial statements.
                          This accuracy is crucial for informed decision-making,
                          financial planning, and maintaining stakeholder trust.
                        </p>
                      </div>
                      <div className={styles.section2_col1}>
                        <h3>
                          <img
                            src="/checkblue.svg"
                            alt="Icon"
                            className={styles.service2_icon}
                          />
                          <span>Improved Efficiency:</span>
                        </h3>
                        <p>
                          Our experienced team uses advanced accounting software
                          and best practices to streamline the reconciliation
                          process, saving you time and resources. We provide
                          detailed reports and actionable insights to help you
                          understand your financial position and make informed
                          business decisions.
                        </p>
                      </div>
                    </div>
                    <div className="w-1/2 px-4 padd_left">
                      <div className={styles.section2_col1}>
                        <h3>
                          <img
                            src="/checkblue.svg"
                            alt="Icon"
                            className={styles.service2_icon}
                          />
                          <span>Fraud Detection:</span>
                        </h3>
                        <p>
                          Reconciliations can uncover potential fraudulent
                          activity, allowing for early intervention and
                          safeguarding your company&#39;s assets.
                        </p>
                      </div>
                      <div className={styles.section2_col1}>
                        <h3>
                          <img
                            src="/checkblue.svg"
                            alt="Icon"
                            className={styles.service2_icon}
                          />
                          <span>Regulatory Compliance:</span>
                        </h3>
                        <p>
                          Accurate and transparent financial reporting is
                          essential for meeting the requirements of regulatory
                          bodies and avoiding potential penalties. Our thorough
                          reconciliation process ensures that your financial
                          statements are compliant with accounting standards and
                          regulations.
                          <br />
                          Choose Accio Finance for your balance sheet
                          reconciliation needs and experience the confidence
                          that comes with accurate and reliable financial
                          statements. Our specialized services ensure that your
                          financial records reflect your business&#39;s
                          financial health, supporting your growth and success.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className={styles.view_btn}>
              <button onClick={() => handleToggle("service1")}>
                {isExpanded.service1 ? "View Less" : "View More"}
              </button>
            </div>
          </div>
          <div className={styles.service_row1}>
            <h3>Accounts Receivable and Payable Reconciliations</h3>
            <p>
              Our accounts receivable and payable reconciliation services help
              you keep track of outstanding invoices and payments. We reconcile
              your records to ensure that all transactions are accurately
              recorded, reducing the risk of errors and improving financial
              transparency.
            </p>
            {isExpanded.service2 && (
              <div className={styles.service_expand}>
                <h4>Our services would typically involve the following:</h4>
                <div className="flex justify-center">
                  <div className="w-1/3 px-2 mb-4">
                    <div className={styles.service_card}>
                      <div className={styles.card_bg}>
                        <img
                          src="/service5-bg.svg"
                          alt="Icon"
                          className={styles.card_icon}
                        />
                      </div>
                      <div className={styles.card_img}>
                        <img
                          src="/service5.svg"
                          alt="Icon"
                          className={styles.card_icon}
                        />
                      </div>
                      <div className={styles.card_heading}>
                        Matching your sales invoices with customer payments:
                      </div>
                      <div className={styles.card_content}>
                        Our team reviews and matches your sales invoices with
                        customer payments.
                      </div>
                    </div>
                  </div>
                  <div className="w-1/3 px-2 mb-4">
                    <div className={styles.service_card}>
                      <div className={styles.card_bg}>
                        <img
                          src="/service6-bg.svg"
                          alt="Icon"
                          className={styles.card_icon}
                        />
                      </div>
                      <div className={styles.card_img}>
                        <img
                          src="/service6.svg"
                          alt="Icon"
                          className={styles.card_icon}
                        />
                      </div>
                      <div className={styles.card_heading}>
                        Identifying Discrepancies:
                      </div>
                      <div className={styles.card_content}>
                        We will then identify discrepancies such as
                        overpayments, underpayments, or missed payments.
                      </div>
                    </div>
                  </div>
                  <div className="w-1/3 px-2 mb-4">
                    <div className={styles.service_card}>
                      <div className={styles.card_bg}>
                        <img
                          src="/service4-bg.svg"
                          alt="Icon"
                          className={styles.card_icon}
                        />
                      </div>
                      <div className={styles.card_img}>
                        <img
                          src="/service4.svg"
                          alt="Icon"
                          className={styles.card_icon}
                        />
                      </div>
                      <div className={styles.card_heading}>
                        Taking Corrective Action:
                      </div>
                      <div className={styles.card_content}>
                        We will take corrective action to resolve these issues.
                        This would include preparing a clear report detailing
                        the reconciliation process, identifying discrepancies,
                        and making adjustments.
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.service_section2}>
                  <h2>Here is why you should choose our services:</h2>
                  <div className="flex">
                    <div className="w-1/2 px-4 border_rght">
                      <div className={styles.section2_col1}>
                        <h3>
                          <img
                            src="/checkblue.svg"
                            alt="Icon"
                            className={styles.service2_icon}
                          />
                          <span>Error Reduction and Financial Accuracy:</span>
                        </h3>
                        <p>
                          Regular reconciliation of accounts receivable and
                          payable helps reduce errors that can lead to financial
                          misstatements. By matching sales invoices with
                          customer payments and purchase invoices with supplier
                          payments, our experts will identify and correct
                          discrepancies. This process will ensure that your
                          financial records are accurate and up-to-date, which
                          is essential for reliable financial reporting and
                          informed decision-making.
                        </p>
                      </div>
                      <div className={styles.section2_col1}>
                        <h3>
                          <img
                            src="/checkblue.svg"
                            alt="Icon"
                            className={styles.service2_icon}
                          />
                          <span>Effective Cash Flow Management:</span>
                        </h3>
                        <p>
                          Our experts will help you keep track of all
                          outstanding receivables and payables. This will allow
                          you to monitor your cash flow more closely and make
                          accurate decisions about credit terms, payment
                          schedules, and working capital management.
                        </p>
                      </div>
                    </div>
                    <div className="w-1/2 px-4 padd_left">
                      <div className={styles.section2_col1}>
                        <h3>
                          <img
                            src="/checkblue.svg"
                            alt="Icon"
                            className={styles.service2_icon}
                          />
                          <span>Timely Collections and Payments:</span>
                        </h3>
                        <p>
                          Our timely reconciliation of accounts receivable and
                          payable services ensures that you stay on top of
                          outstanding debts and obligations. You can follow up
                          promptly on overdue invoices, improving your
                          collection process and reducing the risk of bad debts.
                          Our experts will help in ensuring that you make timely
                          payments to suppliers, which can help you maintain
                          good relationships and possibly take advantage of
                          early payment discounts, ultimately improving your
                          cash flow and financial position.
                          <br />
                          Choose Accio Finance for your accounts receivable and
                          payable reconciliation needs and experience improved
                          cash flow management, enhanced financial accuracy,
                          timely collections and payments, better financial
                          control, regulatory compliance, fraud prevention, and
                          operational efficiency.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className={styles.view_btn}>
              <button onClick={() => handleToggle("service2")}>
                {isExpanded.service2 ? "View Less" : "View More"}
              </button>
            </div>
          </div>
          <div className={styles.service_row1}>
            <h3>Bank Reconciliations</h3>
            <p>
              Bank reconciliations are essential for ensuring that your
              financial records match your bank statements. At Accio Finance we
              provide thorough bank reconciliation services to verify that all
              transactions are accurately recorded by identifying any
              discrepancies between your internal records and bank statements.
              This service helps prevent fraud, detect errors, and ensure
              accurate financial reporting.
            </p>
            {isExpanded.service3 && (
              <div className={styles.service_expand}>
                <h4>Our services would typically involve the following:</h4>
                <div className="flex justify-center">
                  <div className="w-1/3 px-2 mb-4">
                    <div className={styles.service_card}>
                      <div className={styles.card_bg}>
                        <img
                          src="/service5-bg.svg"
                          alt="Icon"
                          className={styles.card_icon}
                        />
                      </div>
                      <div className={styles.card_img}>
                        <img
                          src="/service5.svg"
                          alt="Icon"
                          className={styles.card_icon}
                        />
                      </div>
                      <div className={styles.card_heading}>
                        Obtaining Bank Statements & Data Comparisons:
                      </div>
                      <div className={styles.card_content}>
                        Our bank reconciliation process begins with obtaining
                        your bank statements and comparing them with your
                        internal financial records.
                      </div>
                    </div>
                  </div>
                  <div className="w-1/3 px-2 mb-4">
                    <div className={styles.service_card}>
                      <div className={styles.card_bg}>
                        <img
                          src="/mony-bg.svg"
                          alt="Icon"
                          className={styles.card_icon}
                        />
                      </div>
                      <div className={styles.card_img}>
                        <img
                          src="/mony.svg"
                          alt="Icon"
                          className={styles.card_icon}
                        />
                      </div>
                      <div className={styles.card_heading}>
                        Transaction Review:
                      </div>
                      <div className={styles.card_content}>
                        We meticulously review each transaction, including
                        deposits, withdrawals, and transfers, to ensure that
                        they are correctly recorded in your accounting system.
                      </div>
                    </div>
                  </div>
                  <div className="w-1/3 px-2 mb-4">
                    <div className={styles.service_card}>
                      <div className={styles.card_bg}>
                        <img
                          src="/list-bg.svg"
                          alt="Icon"
                          className={styles.card_icon}
                        />
                      </div>
                      <div className={styles.card_img}>
                        <img
                          src="/list.svg"
                          alt="Icon"
                          className={styles.card_icon}
                        />
                      </div>
                      <div className={styles.card_heading}>
                        Identification of Discrepancy:
                      </div>
                      <div className={styles.card_content}>
                        This detailed review helps us identify discrepancies
                        such as missing transactions, duplicate entries, etc.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-1/3 px-2 mb-4">
                    <div className={styles.service_card}>
                      <div className={styles.card_bg}>
                        <img
                          src="/info-bg.svg"
                          alt="Icon"
                          className={styles.card_icon}
                        />
                      </div>
                      <div className={styles.card_img}>
                        <img
                          src="/info.svg"
                          alt="Icon"
                          className={styles.card_icon}
                        />
                      </div>
                      <div className={styles.card_heading}>
                        Taking corrective measures:
                      </div>
                      <div className={styles.card_content}>
                        This includes adjusting your records to reflect accurate
                        information and ensuring that your financial statements
                        are precise and up-to-date.
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.service_section2}>
                  <h2>Here is why you should choose our services:</h2>
                  <div className="flex">
                    <div className="w-1/2 px-4 border_rght">
                      <div className={styles.section2_col1}>
                        <h3>
                          <img
                            src="/checkblue.svg"
                            alt="Icon"
                            className={styles.service2_icon}
                          />
                          <span>Detect Unauthorised Transactions:</span>
                        </h3>
                        <p>
                          Regular bank reconciliations help detect unauthorized
                          transactions or suspicious activities early, allowing
                          you to take prompt action to protect your
                          business&#39;s assets. By ensuring that your financial
                          records are accurate and up-to-date, we help you
                          maintain the integrity of your financial reporting.
                        </p>
                      </div>
                      <div className={styles.section2_col1}>
                        <h3>
                          <img
                            src="/checkblue.svg"
                            alt="Icon"
                            className={styles.service2_icon}
                          />
                          <span>Financial Accuracy:</span>
                        </h3>
                        <p>
                          Our bank reconciliation services also enhance
                          financial accuracy. By identifying and correcting
                          discrepancies, we ensure that your financial
                          statements reflect the correct position of your
                          business.
                        </p>
                      </div>
                    </div>
                    <div className="w-1/2 px-4 padd_left">
                      <div className={styles.section2_col1}>
                        <h3>
                          <img
                            src="/checkblue.svg"
                            alt="Icon"
                            className={styles.service2_icon}
                          />
                          <span>Regulatory Compliance:</span>
                        </h3>
                        <p>
                          Accurate and transparent financial reporting is
                          essential for meeting regulatory requirements and
                          avoiding potential penalties. Our reconciliation
                          process ensures that your financial statements are
                          compliant with accounting standards and regulations.
                        </p>
                      </div>
                      <div className={styles.section2_col1}>
                        <h3>
                          <img
                            src="/checkblue.svg"
                            alt="Icon"
                            className={styles.service2_icon}
                          />
                          <span>Detailed Reports:</span>
                        </h3>
                        <p>
                          Our experienced team provides detailed reports and
                          actionable insights, helping you understand your cash
                          flow. Our specialized services guarantee that your
                          financial records are consistent with your bank
                          statements, fostering your business&#39;s growth and
                          success.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className={styles.view_btn}>
              <button onClick={() => handleToggle("service3")}>
                {isExpanded.service3 ? "View Less" : "View More"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <img
          src="/delete_dismiss.svg"
          alt="close"
          width="18px"
          height="18px"
          className="object-contain"
          onClick={closeModal}
        />
        <div className={styles.formContainer}>
          {modalView === "form" ? (
            // Form content
            <div className={styles.modal_main}>
              <div className={styles.modal_col1}>
                <img src="/modalimg.png" alt="form-image" />
              </div>
              <div className={styles.modal_col2}>
                <h2>Book a call</h2>
                <p>How we can help you</p>
                <form onSubmit={handleSubmit}>
                  <div className={styles.input_box}>
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jhon Doe"
                    />
                    {validationErrors.name && (
                      <div className={styles.errorMessage}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                          />
                        </svg>
                        {validationErrors.name}
                      </div>
                    )}
                  </div>
                  <div className={styles.input_box}>
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jhondoe@example.com"
                    />
                    {validationErrors.email && (
                      <div className={styles.errorMessage}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                          />
                        </svg>
                        {validationErrors.email}
                      </div>
                    )}
                  </div>
                  <div className="rowbox flex justify-between">
                    <div className="w-2/3 pl-3 pr-3">
                      <label>Country Code</label>
                      <Select
                        defaultValue={selectedOption}
                        onChange={handleCountryCodeChange}
                        options={countries}
                      />
                      {validationErrors.countryCode && (
                        <div className={styles.errorMessage}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                            />
                          </svg>
                          {validationErrors.countryCode}
                        </div>
                      )}
                    </div>
                    <div className="w-2/3 pl-3 pr-3">
                      <label>Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone No"
                        minLength="6"
                        maxLength="15"
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                      />
                      {validationErrors.phone && (
                        <div className={styles.errorMessage}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                            />
                          </svg>
                          {validationErrors.phone}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles.popup_btn}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={isSubmitting ? "disabled-button" : ""}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <div className={styles.mobileimg}>
                <img src="/popupimg.png" alt="form-image" />
              </div>
            </div>
          ) : (
            // Thank you content
            <div className={styles.modal_thank}>
              <img src="/thanks.png" alt="Thank you" />
              <h2>Thank You!</h2>
              <p>
                Thank you for reaching out, Our team will get back to you in 24
                hours
              </p>
            </div>
          )}
        </div>

        <Script id="data-layer-script" strategy="afterInteractive">
            {`
          window.dataLayer = window.dataLayer || [];
        `}
          </Script>
      </Modal>
    </section>
  );
};

export default Service;
