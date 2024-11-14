"use client"; // This is a client component 👈🏽
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Select from "react-select";
import styled from "styled-components";
import countries from "../../../libs/countries";
import validateName from "@/common/validateName";
import validateEmail from "@/common/validateEmail";
import validatePhone from "@/common/validatePhone";
import styles from "../heroBanner/HeroBanner.module.css";
import Script from "next/script";

function PageContent({ html }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState("form");
  const [selectedOption, setSelectedOption] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "",
    phone: "",
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: "",
      email: "",
      countryCode: "",
      phone: "",
    });
    setSelectedOption(null);
  };

  const clearValidationMessage = (fieldName) => {
    setValidationErrors((prevErrors) => {
      // Create a copy of the previous validation errors object
      const newErrors = { ...prevErrors };
      // Clear the error message for the specified field
      delete newErrors[fieldName];
      return newErrors;
    });
  };

  const handleCountryCodeChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setFormData((prevFormData) => ({
      ...prevFormData,
      countryCode: selectedOption.value,
    }));
    clearValidationMessage("countryCode");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    clearValidationMessage(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const requiredFields = ["name", "email", "countryCode", "phone"];
    const newErrors = {};
    for (const field of requiredFields) {
      if (!formData[field]) {
        newErrors[field] = `Please fill in the ${field} field.`;
      }
    }

    if (formData.name && !validateName(formData.name)) {
      newErrors.name = "Name cannot contain numbers or special characters.";
    }

    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (Object.keys(newErrors).length > 0) {
      setValidationErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    setValidationErrors({});
    try {
      await axios.post(`/api/v1/lead/bookcall`, formData);
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
      setModalView("thankYou");
    } catch (error) {
      console.error("API Request Error:", error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Attach event listeners after component mounts
    const handleButtonClick = (event) => {
      if (event.target.matches(".open-modal-btn")) {
        openModal();
      }
    };

    // Add event listener for button clicks
    document.addEventListener("click", handleButtonClick);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("click", handleButtonClick);
    };
  }, []);

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

  return (
    <div>
      {/* Render the HTML content */}
      <div dangerouslySetInnerHTML={{ __html: html }} />

      <Modal
        isOpen={isModalOpen}
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
                      placeholder="John Doe"
                    />
                    {validationErrors.name && (
                      <div className={styles.errorMessage}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="size-6"
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
                          className="size-6"
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
                            className="size-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.                                                    126ZM12 15.75h.007v.008H12v-.008Z"
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
                      />
                      {validationErrors.phone && (
                        <div className={styles.errorMessage}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="size-6"
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
                    <button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
              <div className={styles.mobileimg}>
                <img src="/modalimg.png" alt="form-image" />
              </div>
            </div>
          ) : (
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
      <ToastContainer />
    </div>
  );
}

export default PageContent;
