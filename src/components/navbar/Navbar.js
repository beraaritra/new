/* eslint-disable @next/next/no-img-element */
"use client"; // This is a client component 👈🏽
import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Logo from "../../../public/logo.png";
import Image from "next/image";
import Modal from "react-modal";
import Close from "../../../public/close.png";
import countries from "../../../libs/countries";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import styled from "styled-components";
import { usePathname } from "next/navigation";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { getVisibleSection } from "@/common/utils";
import validateName from "@/common/validateName";
import validateEmail from "@/common/validateEmail";
import validatePhone from "@/common/validatePhone";
import Script from "next/script";

import { BookingCreationContent } from "../bookingCreationContent/BookingCreationContent";
import { BookingConfirmContent } from "../bookingConfirmContent/BookingConfirmContent";
import { BookingReviewContent } from "../bookingReviewContent/BookingReviewContent";

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
const Navbar = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [navbar, setNavbar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalView, setModalView] = useState("form");
  const [activeSection, setActiveSection] = useState("");
  const [scrolling, setScrolling] = useState(false);

  const sections = [
    "#about_section",
    "#services_section",
    "#testimonials_section",
  ];
  const [isOpenMobileScreen, setIsOpenMobileScreen] = useState(false);
  const handleResponsiveNavbar = () => {
    setIsOpenMobileScreen(true);
  };
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((section) =>
        document.querySelector(section)
      );
      const visibleSectionId = getVisibleSection(sectionElements);

      const modifiedVisibleSectionId = `#${visibleSectionId}`;

      console.log("visibleSectionId", modifiedVisibleSectionId);

      setActiveSection(visibleSectionId);
      // Update scroll state
      setScrolling(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleItemClick = (sectionId) => {
    setActiveSection(sectionId);
    setNavbar(!navbar);
  };

  // Now, you can use the 'pathname' variable as needed
  const pathname = usePathname();
  console.log("Current pathname:", pathname);

  const searchParams = useSearchParams();

  console.log("searchParams searchParams", searchParams);
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
      // const response = await axios.post(`/api/v1/lead/bookcall`, formData);

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
      setModalView("booking creation"); // Switch to thank you view
      setIsSubmitting(false);
      // console.log("API Response:", response.data);
    } catch (error) {
      // Handle API request error (e.g., show an error message)
      console.error("API Request Error:", error);
      toast.error(error.response.data.message || error.message);
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

  const [isReschedule, setIsReschedule] = useState(false);
  const [bookingDataResponse, setBookingDataResponse] = useState({})

  function closeModal() {
    setIsOpen(false);
    setFormData({
      name: "",
      email: "",
      countryCode: "",
      phone: "",
    });
    setSelectedOption(null);
    setBookingData({})
    setIsReschedule(false)
    setBookingDataResponse({})
  }

  console.log("activeSection", activeSection);
  const [activeRoute, setActiveRoute] = useState("/");

  const handleItemClickNavTab = (route) => {
    setActiveRoute(route);
  };

  const [bookingData, setBookingData] = useState({
    eventId: null,
    timeZone: "",
    time_zone: "",
    title: "",
    scheduleId: null,
    userId: null,
    company_type: "in_house",
    startTime: null,
    endTime: null,
    responses: {},
    teamId: null,
    student_name: "",
    student_email: "",
    selectedDate: new Date().toISOString(),
    selectedSlot: null,
    organizationId: 5
  });
  return (
    <>
      <header className={styles.header}>
        <div className="container mx-auto">
          <div className={styles.navbar}>
            <div className={styles.hamburger} onClick={handleResponsiveNavbar}>
              <img src="/hamburger.png" />
            </div>
            <div className={styles.logo}>
              <img
                src="/accio-logo.svg"
                alt="logo"
                className="object-contain"
              />
            </div>
            <div className={styles.menubar}>
              <div
                // className={styles.menu}
                className={`${styles.menu} ${isOpenMobileScreen ? styles.openmobilemenu : ""
                  }`}
              >
                <div
                  className={styles.cross}
                  onClick={() => setIsOpenMobileScreen(false)}
                >
                  <img src="/cross.svg" alt="cross" className="cancel" />
                </div>
                <ul>
                  <li>
                    <Link
                      href="/"
                      onClick={() => handleItemClickNavTab("/")}
                      className={activeRoute === "/" ? styles.activeRoute : ""}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/whatWeDo"
                      onClick={() => handleItemClickNavTab("/whatWeDo")}
                      className={
                        activeRoute === "/whatWeDo" ? styles.activeRoute : ""
                      }
                    >
                      What We Do
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/whoWeAre"
                      onClick={() => handleItemClickNavTab("/whoWeAre")}
                      className={
                        activeRoute === "/whoWeAre" ? styles.activeRoute : ""
                      }
                    >
                      Who We Are
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/career"
                      onClick={() => handleItemClickNavTab("/career")}
                      className={
                        activeRoute === "/career" ? styles.activeRoute : ""
                      }
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contactUs"
                      onClick={() => handleItemClickNavTab("/contactUs")}
                      className={
                        activeRoute === "/contactUs" ? styles.activeRoute : ""
                      }
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/faq"
                      onClick={() => handleItemClickNavTab("/faq")}
                      className={
                        activeRoute === "/faq" ? styles.activeRoute : ""
                      }
                    >
                      FAQs
                    </Link>
                  </li>
                </ul>
              </div>
              <div className={styles.callbutton}>
                <button onClick={openModal}>
                  <img src="/call.svg" alt="logo" className="object-contain" />
                  Book A Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

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
              className={styles.closeicon}
              onClick={closeModal}
            />
          

          <div className={styles.formContainer}>
            {/* {modalView === "form" ? (
              <div className={styles.modal_main}>
                <div className={styles.modalimg}>
                  <img src="/modal1.svg" alt="form-image" />
                </div>
                <div className={styles.modalformwrap}>
                  <h2>Book a call</h2>
                  <div className={styles.formwrap}>
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
                      <div className={styles.fromwrapper}>
                        <div className={styles.input_box}>
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
                        <div className={styles.input_box}>
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
                </div>
              </div>
            ) : (
              // Thank you content
              <div className={styles.modal_thank}>
                <img src="/thanks.png" alt="Thank you" />
                <h2>Thank You!</h2>
                <p>
                  Thank you for reaching out, Our team will get back to you in
                  24 hours
                </p>
              </div>
            )}
          </div>
        </div>
        <div className={styles.calendermodal}>
          <div className={styles.close}>
            <img
              src="/delete_dismiss.svg"
              alt="close"
              width="18px"
              height="18px"
              className={styles.closeicon}
              onClick={closeModal}
            />
          </div>

          <div className={styles.formContainer}>
            {modalView === "form" ? (
              <div className={styles.modal_main}>
                <div className={styles.mainwrapper}>
                  <div className={styles.menuside}>
                    <div className={styles.title}>
                      <h2>Acciofinance Team</h2>
                      <h4>30 Min Meeting</h4>
                      <ul>
                        <li>
                          <img src="/clock.svg " />
                          30 mins
                        </li>
                        <li>
                          <img src="/video.svg " />
                          Cal Video
                        </li>
                        <li>
                          <img src="/web.svg " />
                          <select>
                            <option>Asia/Kolkata</option>
                            <option>Asia/Kolkata</option>
                            <option>Asia/Kolkata</option>
                          </select>
                        </li>
                      </ul>
                    </div>
                    <div className={styles.image}>
                      <img src="/calendermodal.svg" />
                    </div>
                  </div>
                  <div className={styles.calenderbox}></div>
                  <div className={styles.timezone}>
                    <div className={styles.hourwrap}>
                      <span>Thu 04</span>
                      <div className={styles.buttonwrap}>
                        <button type="button" className={styles.active}>
                          12h
                        </button>
                        <button type="button">24h</button>
                      </div>
                    </div>
                    <div className={styles.timelist}>
                      <ul>
                        <li>
                          <input type="checkbox" />
                          <label>9:00am</label>
                        </li>
                        <li>
                          <input type="checkbox" />
                          <label>10:00am</label>
                        </li>
                        <li>
                          <input type="checkbox" />
                          <label>11:00am</label>
                        </li>
                        <li>
                          <input type="checkbox" />
                          <label>12:00pm</label>
                        </li>
                        <li>
                          <input type="checkbox" />
                          <label>13:00pm</label>
                        </li>
                        <li>
                          <input type="checkbox" />
                          <label>14:00pm</label>
                        </li>
                        <li>
                          <input type="checkbox" />
                          <label>15:00pm</label>
                        </li>
                      </ul>
                    </div>
                    <div className={styles.button_wrap}>
                      <button type="button" className={styles.transparent}>
                        Back
                      </button>
                      <button type="button">Next</button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Thank you content
              <div className={styles.modal_thank}></div>
            )}
          </div>
        </div>
        <div className={styles.subjectmodal}>
          <div className={styles.close}>
            <img
              src="/delete_dismiss.svg"
              alt="close"
              width="18px"
              height="18px"
              className={styles.closeicon}
              onClick={closeModal}
            />
          </div>

          <div className={styles.formContainer}>
            {modalView === "form" ? (
              <div className={styles.modal_main}>
                <div className={styles.mainwrapper}>
                  <div className={styles.menuside}>
                    <div className={styles.title}>
                      <h2>Acciofinance Team</h2>
                      <h4>30 Min Meeting</h4>
                      <ul>
                        <li>
                          <img src="/clock.svg " />
                          30 mins
                        </li>
                        <li>
                          <img src="/video.svg " />
                          Cal Video
                        </li>
                        <li>
                          <img src="/web.svg " />
                          <select>
                            <option>Asia/Kolkata</option>
                            <option>Asia/Kolkata</option>
                            <option>Asia/Kolkata</option>
                          </select>
                        </li>
                      </ul>
                    </div>
                    <div className={styles.image}>
                      <img src="/calendermodal.svg" />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Thank you content
              <div className={styles.modal_thank}></div>
            )} */}


            {(() => {
              switch (modalView) {
                case "form":
                  return (
                    // Lead form content
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
                        <img src="/modalimg.png" alt="form-image" />
                      </div>
                    </div>
                  );

                  case "booking creation":
                    return (
                      // Booking creation content
                      <BookingCreationContent setModalView={setModalView} bookingData={bookingData}
                        setBookingData={setBookingData} />
                    );
    
                  case "booking confirm":
                    return (
                      // Booking confirmation content
                      <BookingConfirmContent setModalView={setModalView} bookingData={bookingData} setBookingData={setBookingData} isReschedule={isReschedule} setIsReschedule={setIsReschedule} bookingDataResponse={bookingDataResponse} setBookingDataResponse={setBookingDataResponse}/>
                    );
    
                  case "booking review":
                    return (
                      // Booking confirmation content
                      <BookingReviewContent setModalView={setModalView} bookingData={bookingData} setBookingData={setBookingData} isReschedule={isReschedule} setIsReschedule={setIsReschedule} bookingDataResponse={bookingDataResponse} setBookingDataResponse={setBookingDataResponse} />
                    );
    
                  case "thank you":
                    return (
                      // Thank you content
                      <div className={styles.modal_thank}>
                        <img src="/thanks.png" alt="Thank you" />
                        <h2>Thank You!</h2>
                        <p>
                          Thank you for reaching out, our team will get back to you within 24 hours.
                        </p>
                      </div>
                    );
    
                  default:
                    return null;
                }
              })()}
    
          </div>

        <Script id="data-layer-script" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
        `}
        </Script>
      </Modal>
    </>
  );
};
// $(".toggle-mnu").click(function () {
//     $(this).toggleClass("on");
//     $(".main-mnu").slideToggle();
//     return false;
// });

const DateTimeInput = styled.div`
  background-color: ${(props) => (props.wantdemo ? "lightgreen" : "white")};
  /* Add other CSS styles here */
`;
export default Navbar;
