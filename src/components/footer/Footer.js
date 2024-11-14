"use client"; // This is a client component 👈🏽
import React, { useState, useEffect } from "react";
import styles from "./Footer.module.css";
import Link from "next/link";
import Modal from "react-modal";
import { useSearchParams, usePathname } from "next/navigation";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import styled from "styled-components";
import countries from "../../../libs/countries";
import { getVisibleSection } from "@/common/utils";
import validateName from "@/common/validateName";
import validateEmail from "@/common/validateEmail";
import validatePhone from "@/common/validatePhone";

import Script from "next/script";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const [selectedOption, setSelectedOption] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [navbar, setNavbar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalView, setModalView] = useState("form");
  const [activeSection, setActiveSection] = useState("");

  const sections = [
    "#privacy_policy_section",
    "#services_section",
    "#testimonials_section",
  ];

  // useEffect(() => {
  //     const handleScroll = () => {
  //         const sectionElements = sections.map((section) => document.querySelector(section));
  //         const visibleSectionId = getVisibleSection(sectionElements);

  //         const modifiedVisibleSectionId = `#${visibleSectionId}`;

  //         console.log("visibleSectionId", modifiedVisibleSectionId);

  //         setActiveSection(visibleSectionId);
  //     };

  //     window.addEventListener("scroll", handleScroll);
  //     return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const handleItemClick = (sectionId) => {
    setActiveSection(sectionId);
  };
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
          phone_number: "+" + formData.countryCode + formData.phone,
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
  return (
    <footer className={styles.footer}>
      <div className="container mx-auto">
        <div className={styles.getintouch}>
          <div className={styles.heading}>
            <h1>Get in touch</h1>
            <p>
              Want to get in touch? We'd love to hear from you. Here's how you
              can reach us
            </p>
          </div>
          <div className={styles.addresswrap}>
            <div className={styles.address}>
              <div className={styles.wrap}>
                <strong>Mailing Address:</strong>
                <p>
                  Accio Finance. C/O: INCORP PRO, 170-422 RICHARDS ST VANCOUVER
                  BC V6B 2Z4 CANADA
                </p>
              </div>
              <div className={styles.wrap}>
                <strong>Contact Number</strong>
                <p className="phonenmbr">
                  <img src="/phonebordered.png" />
                  +17073883139
                </p>
              </div>
            </div>
            <div className={styles.address}>
              <div className={styles.wrap}>
                <strong>USA</strong>
                <p>
                  8, The Green, STE B(street), Dover, County of Kent Zip Code
                  19901
                </p>
              </div>
              <div className={styles.wrap}>
                <p className="phonenmbr">
                  447 Broadway, 2nd Floor,  1036, New York, NY 10013,  United
                  States of America
                </p>
              </div>
            </div>
            <div className={styles.address}>
              <div className={styles.wrap}>
                <strong>UK</strong>
                <p>128, City Road, London, EC1V2NX, United Kingdom</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footerwrap}>
          <div className={styles.whatwedo}>
            <div class={styles.heading}>
              <p>What We Do</p>
            </div>
            <div className={styles.linkwrap}>
              <ul>
                <li>
                  <Link href="">
                    <img src="/link-a.svg" /> Account Reconciliation Services
                  </Link>
                </li>
                <li>
                  <Link href="">
                    <img src="/link-b.svg" /> Bookkeeping & Accounting Services
                  </Link>
                </li>
                <li>
                  <Link href="">
                    <img src="/link-c.svg" /> Virtual CFO Services
                  </Link>
                </li>
                <li>
                  <Link href="">
                    <img src="/link-d.svg" /> Employee & Payroll Management
                    Services
                  </Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link href="">
                    <img src="/link-e.svg" /> Tax Compliance for businesses
                  </Link>
                </li>
                <li>
                  <Link href="">
                    <img src="/link-f.svg" /> Virtual Assistant Services
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.otherlink}>
            <div className={styles.heading}>
              <p>Who We Are</p>
            </div>
            <ul>
              <li>
                <Link href="">
                  <img src="/ficon1.svg" /> About Us
                </Link>
              </li>
              <li>
                <Link href="">
                  <img src="/ficon2.svg" /> Leadership Team
                </Link>
              </li>
              <li>
                <Link href="">
                  <img src="/ficon3.svg" /> Careers
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.otherlink}>
            <div className={styles.heading}>
              <p>Our Policies</p>
            </div>
            <ul>
              <li>
                <Link href="">
                  <img src="/ficon4.svg" /> Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="">
                  <img src="/ficon5.svg" /> Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="">
                  <img src="/ficon6.svg" /> Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="">
                  <img src="/ficon7.svg" /> Do Not Sell My Personal Information
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.copyright}>
        <p> © 2024 AccioFinance.com. All right reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
