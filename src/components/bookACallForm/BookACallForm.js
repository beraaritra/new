"use client"; // This is a client component 👈🏽
import React, { useState } from "react";
import styles from "./BookACallForm.module.css";
import countries from "../../../libs/countries";
import axios from "axios";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import validateName from "@/common/validateName";
import validateEmail from "@/common/validateEmail";
import validatePhone from "@/common/validatePhone";





const BookACallForm = ({ source, utm_source, utm_medium, utm_campaign, utm_content }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        countryCode: "",
        phone: "",
        businessSector: "",
        companySize: "",
        wantDemo: false,
        scheduleDate: "", // Combine date and time into a single field
        source: source || 'AccioFinance',
        utm_source: utm_source || null,
        utm_medium: utm_medium || null,
        utm_campaign: utm_campaign || null,
        utm_content: utm_content || null
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
    const handleDateChange = (moment) => {
        // const value = moment._d.toString()
        // console.log(value)
        // setFormData({
        //     ...formData,
        //     scheduleDate: formData.wantDemo ? value : "" // Set to null if wantDemo is false
        // });
        if (moment.isAfter(new Date())) {
            setFormData({
                ...formData,
                scheduleDate: moment.toDate(),
            });
            clearValidationMessage("scheduleDate");
        } else {
            // If the selected date is in the past, don't update the state
            setValidationErrors({
                ...validationErrors,
                scheduleDate: 'Please select a future date and time.',
            });
        }

    };

    const validatePhoneNumber = (phone) => {
        // Regular expression to match a phone number with spaces and digits
        const phoneRegex = /^[0-9\s]+$/;
        return phoneRegex.test(phone);
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
        const requiredFields = [
            "name",
            "email",
            "countryCode",
            "phone",
            "businessSector",
            "companySize",
        ];
        const newErrors = {};
        for (const field of requiredFields) {
            if (!formData[field]) {
                newErrors[field] = `Please fill in the ${field} field.`;

            }
        }

        // Validate the name field to ensure it doesn't contain numbers
        if (formData.name && !validateName(formData.name)) {
            newErrors.name = 'Name cannot contain numbers or special characters.';
        }

        // Validate the email field
        if (formData.email && !validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }

        // Validate the email phone
        if (formData.phone && !validatePhone(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number.';
        }

        // If the checkbox is checked, validate the "Schedule Date and Time" field
        if (formData.wantDemo && !formData.scheduleDate) {
            newErrors.scheduleDate = "Please select a schedule date and time.";

        }

        // if (formData.scheduleDate.isAfter(new Date())) {
        //     setFormData({
        //         ...formData,
        //         scheduleDate: moment.toDate(),
        //     });
        //     clearValidationMessage("scheduleDate");
        // } else {
        //     // If the selected date is in the past, don't update the state
        //     setValidationErrors({
        //         ...validationErrors,
        //         scheduleDate: 'Please select a future date and time.',
        //     });
        // }

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

            console.log("formData", formData);
            const response = await axios.post(`/api/v1/lead/bookcall`, formData);
            setFormData({
                name: "",
                email: "",
                countryCode: "",
                phone: "",
                businessSector: "",
                companySize: "",
                wantDemo: false,
                scheduleDate: "",
            });
            setSelectedOption(null);
            // Redirect to the "Thank you" page
            window.location.href = "/thank-you";
            setIsSubmitting(false);
            console.log("API Response:", response.data);
        } catch (error) {
            // Handle API request error (e.g., show an error message)
            console.error("API Request Error:", error);
            toast.error(error.response.data.message || error.message);
            setIsSubmitting(false);
        } finally {
            setIsSubmitting(false); // Re-enable the submit button after submission
        }
    };

    const showDateTimePicker = () => {
        console.log("clicked");
        // Show a date picker
        const inputDateElement = document.querySelector(
            'input[type="datetime-local"]'
        );
        inputDateElement.showPicker();
    };

    return (
        <div className={styles.formContainer}>
            <div>{/* <ToastContainer /> */}</div>
            <h2>Get a call now or schedule a demo for later.</h2>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name of Founder"
                />
                {validationErrors.name && (
                    <div className={styles.errorMessage}>{validationErrors.name}</div>
                )}
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Founder's Email"
                />
                {validationErrors.email && (
                    <div className={styles.errorMessage}>{validationErrors.email}</div>
                )}
                <div className="rowbox">
                    <div className="w-2/3 pl-3 pr-3">
                        <label>Country Code</label>
                        <Select
                            defaultValue={selectedOption}
                            className="countrycode"
                            onChange={handleCountryCodeChange}
                            options={countries}
                        />
                        {validationErrors.countryCode && (
                            <div className={styles.errorMessage}>
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
                            placeholder="Phone Number"
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
                                {validationErrors.phone}
                            </div>
                        )}
                    </div>
                </div>
                <label>Business Sector</label>
                <select
                    name="businessSector"
                    value={formData.businessSector}
                    onChange={handleChange}
                >
                    <option value="">Select a sector...</option>
                    <option value="Fintech">Fintech</option>
                    <option value="Biotechnology">Biotechnology</option>
                    <option value="Education">Education</option>
                    <option value="Entertainment & Media">Entertainment & Media</option>
                    <option value="IT & ITES">IT & ITES</option>
                    <option value="SaaS/PaaS/BaaS">SaaS/PaaS/BaaS</option>
                    <option value="Pharmaceutical">Pharmaceutical</option>
                    <option value="Food Processing">Food Processing</option>
                    <option value="E Commerce">E Commerce</option>
                    <option value="Fashion & Lifestyle">Fashion & Lifestyle</option>
                    <option value="Retail">Retail</option>
                    <option value="Others">Others...</option>
                    {/* Add more sectors */}
                </select>
                {validationErrors.businessSector && (
                    <div className={styles.errorMessage}>
                        {validationErrors.businessSector}
                    </div>
                )}

                <label>Size of the Company</label>
                <select
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleChange}
                >
                    <option value="">Select Size of the Company...</option>
                    <option value="1-10">1-10</option>
                    <option value="11-20">11-20</option>
                    <option value="21-30">21-30</option>
                    <option value="31-40">31-40</option>
                    <option value="41-50">41-50</option>
                    <option value="51-60">51-60</option>
                    <option value="61-70">61-70</option>
                    <option value="71-80">71-80</option>
                    <option value="81-90">81-90</option>
                    <option value="91-100">91-100</option>
                    <option value="More than 100">More than 100</option>
                </select>
                {validationErrors.companySize && (
                    <div className={styles.errorMessage}>
                        {validationErrors.companySize}
                    </div>
                )}

                <label className={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        name="wantDemo"
                        className="mr-2"
                        checked={formData.wantDemo}
                        onChange={handleChange}
                    />
                    Want to schedule a demo
                </label>

                <div className={formData.wantDemo ? "" : "disabled_box"}>
                    <label wantdemo={formData.wantDemo}>Schedule Date and Time</label>
                    {/* <DateTimeInput className='datetimeinput' wantdemo={formData.wantDemo} onClick={showDateTimePicker}>
                        <input
                            type="datetime-local"
                            name="scheduleDate"
                            value={formData.scheduleDate}
                            onChange={handleChange}
                            disabled={!formData.wantDemo}
                            min={new Date().toISOString().slice(0, 16)}
                        />
                    </DateTimeInput> */}

                    {formData.wantDemo ? (<>

                        <Datetime
                            initialValue={formData.scheduleDate}
                            value={formData.scheduleDate}
                            onChange={handleDateChange}
                            disabled={!formData.wantDemo}
                            input={true}
                            dateFormat="MM/DD/YYYY"
                            timeFormat="hh:mm A"
                            inputProps={{ placeholder: 'Select a date and time', name: "scheduleDate", readOnly: true }}
                        />
                        {validationErrors.scheduleDate && (
                            <div className={styles.errorMessage}>
                                {validationErrors.scheduleDate}
                            </div>
                        )}
                    </>) : (<>



                        <input
                            type="text"
                            name="scheduleDate"
                            placeholder="Select a date and time"

                        />


                    </>)}


                </div>
                <button type="submit" disabled={isSubmitting} className={isSubmitting ? "disabled-button" : ""}>Book Now</button>
            </form>
        </div>
    );
};

const DateTimeInput = styled.div`
  background-color: ${(props) => (props.wantdemo ? "" : "")};

  /* Add other CSS styles here */
`;

export default BookACallForm;
