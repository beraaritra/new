import React, { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is imported
import styles from "./BookingConfirmContent.module.css";
import dayjs from "dayjs";

export const BookingConfirmContent = ({ setModalView, bookingData, setBookingData, isReschedule, setIsReschedule, bookingDataResponse, setBookingDataResponse }) => {
    const [eventDetails, setEventDetails] = useState(null);
    const [formData, setFormData] = useState({
        student_name: bookingData.student_name || "",
        student_email: bookingData.student_email || "",
        // Dynamically set initial values from bookingData.responses
        ...Object.keys(bookingData.responses || {}).reduce((acc, fieldName) => {
            acc[fieldName] = bookingData.responses[fieldName] || "";
            return acc;
        }, {}),
    });

    const handleConfirm = async () => {
        // Dynamically create the responses object
        const responses = {};

        // Add dynamic fields from the event details (if any)
        if (eventDetails?.bookingFields) {
            eventDetails.bookingFields.forEach(field => {
                if (formData[field.name]) {
                    responses[field.name] = formData[field.name];
                }
            });
        }

        // Combine the form data and event details into the final booking data
        const updatedBookingData = {
            ...bookingData,
            student_name: formData.student_name,
            student_email: formData.student_email,
            responses: responses, // Update responses dynamically
        };

        // Set the updated booking data
        setBookingData(updatedBookingData);

        // Log the updated booking data
        console.log(updatedBookingData);
        // Call the API to create the booking before proceeding
        try {
            const response = await fetch('https://scheduling-api-development.lawsikho.dev/api/public/v1/team/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any necessary headers, like Authorization, if needed
                },
                body: JSON.stringify(updatedBookingData),
            });

            if (!response.ok) {
                throw new Error('Failed to create booking');
            }

            // Log the response (you can handle the response as needed)
            const responseData = await response.json();
            console.log('Booking created successfully:', responseData);
            setIsReschedule(true);
            setBookingDataResponse(responseData.data)
            setModalView("booking review");

        } catch (error) {
            console.error('Error while creating booking:', error);
            // Handle the error accordingly (e.g., show an error message)
        }
    };

    const handleBack = () => {
        setModalView("booking creation");
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        // Fetch event details and update state
        axios.get("https://scheduling-api-development.lawsikho.dev/api/event/aquafinance-uq02hw")
            .then(response => setEventDetails(response.data.data[0]))
            .catch(error => console.error("Error fetching event details:", error));

        // Reset formData when bookingData changes
        setFormData({
            student_name: bookingData.student_name || "",
            student_email: bookingData.student_email || "",
            // Dynamically set initial values from bookingData.responses
            ...Object.keys(bookingData.responses || {}).reduce((acc, fieldName) => {
                acc[fieldName] = bookingData.responses[fieldName] || "";
                return acc;
            }, {}),
        });
    }, [bookingData]);  // Dependency array to update when bookingData changes

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString(undefined, options);

        // Extract time from the schedule date (using "HH:mm" format for 24-hour time)
        const extractedTime = dayjs(dateTime).format("HH:mm"); // This will give you the time in 24-hour format (e.g., "10:30")

        // If you need to display it in 12-hour format with AM/PM:
        const extractedTime12Hour = dayjs(dateTime).format("hh:mm A"); // This will give you the time in 12-hour format (e.g., "10:30 AM")

        return { formattedDate, extractedTime12Hour };
    };

    // Format the date and time dynamically
    const { formattedDate, extractedTime12Hour } = bookingData.selectedDate ? formatDateTime(bookingData.selectedSlot) : { formattedDate: "Loading...", formattedTime: "Loading..." };


    const handleConfirmReschedule = async () => {
        // Dynamically create the responses object
        const responses = {};

        // Add dynamic fields from the event details (if any)
        if (eventDetails?.bookingFields) {
            eventDetails.bookingFields.forEach(field => {
                if (formData[field.name]) {
                    responses[field.name] = formData[field.name];
                }
            });
        }

        // Combine the form data and event details into the final booking data
        const updatedBookingData = {
            ...bookingData,
            student_name: formData.student_name,
            student_email: formData.student_email,
            responses: responses, // Update responses dynamically
            startDate: bookingData?.startTime, // New field for start date
            endDate: bookingData?.endTime,
            bookingId: bookingDataResponse?.id,
            eventId: bookingDataResponse?.eventId,
            teamId: bookingDataResponse?.teamId

        };

        // Set the updated booking data
        setBookingData(updatedBookingData);

        // Log the updated booking data
        console.log(updatedBookingData);

        const filteredBookingData = {
            startDate: updatedBookingData.startDate,
            endDate: updatedBookingData.endDate,
            startTime: updatedBookingData.startDate,  // Assuming startTime should match startDate
            endTime: updatedBookingData.endDate,      // Assuming endTime should match endDate
            timeZone: updatedBookingData.timeZone,
            company_type: updatedBookingData.company_type,
            responses: updatedBookingData.responses,
            bookingId: updatedBookingData.bookingId,
            eventId: updatedBookingData.eventId,
            teamId: updatedBookingData.teamId
        };

        // Log the filtered booking data
        console.log(filteredBookingData);


        // Call the reschedule API using axios
        try {
            const response = await axios.post(
                'https://scheduling-api-development.lawsikho.dev/api/public/v1/team/reschedule',
                filteredBookingData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        // Add any necessary headers, like Authorization, if needed
                    }
                }
            );

            // Log the response (you can handle the response as needed)
            console.log('Booking rescheduled successfully:', response.data);
            // Update state to reflect reschedule success
            setIsReschedule(true);
            setModalView("booking review");

        } catch (error) {
            console.error('Error while rescheduling booking:', error);
            // Handle the error accordingly (e.g., show an error message)
        }
    };


    return (
        <div>
            <h2>{eventDetails?.team || "Team Name"}</h2>
            <p>{eventDetails?.length} Min Meeting</p>
            <p>{formattedDate}</p>
            <p>{extractedTime12Hour}</p>

            <div>
                <p>🕒 {eventDetails?.length} mins</p>
                <p>📅 {eventDetails?.locations?.[0]?.type === "integrations:google:meet" ? "Google Meet" : "Video"}</p>
                <p>🌍 {bookingData?.timeZone || ""}</p>
            </div>

            <form>
                <h3>Enter Your Details</h3>
                <div className={styles.formGroup}>
                    <label htmlFor="student_name">Enter your name</label>
                    <input
                        type="text"
                        name="student_name"
                        placeholder="Enter your name"
                        required
                        value={formData.student_name}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="student_email">Enter your email</label>
                    <input
                        type="email"
                        name="student_email"
                        placeholder="Enter your email"
                        required
                        value={formData.student_email}
                        onChange={handleChange}
                    />
                </div>

                <h3>Question</h3>
                {eventDetails?.bookingFields?.map(field => (
                    <div key={field.name} className={styles.formGroup}>
                        <label htmlFor={field.name}>{field.label}</label>

                        {/* Text Input */}
                        {field.type === "text" && (
                            <input
                                type="text"
                                name={field.name}
                                placeholder={field.placeholder}
                                required={field.required}
                                value={formData[field.name] || ""}
                                onChange={handleChange}
                            />
                        )}

                        {/* Textarea */}
                        {field.type === "textarea" && (
                            <textarea
                                name={field.name}
                                placeholder={field.placeholder}
                                required={field.required}
                                value={formData[field.name] || ""}
                                onChange={handleChange}
                            />
                        )}

                        {/* Multiselect */}
                        {field.type === "multiselect" && (
                            <div>
                                {field.options.map(option => (
                                    <div key={option.value} className={styles.checkboxGroup}>
                                        <input
                                            type="checkbox"
                                            id={option.value}
                                            name={field.name}
                                            value={option.value}
                                            checked={formData[field.name]?.includes(option.value) || false}
                                            onChange={(e) => {
                                                const selectedValues = [...(formData[field.name] || [])];
                                                if (e.target.checked) {
                                                    selectedValues.push(e.target.value);
                                                } else {
                                                    const index = selectedValues.indexOf(e.target.value);
                                                    if (index > -1) selectedValues.splice(index, 1);
                                                }
                                                handleChange({ target: { name: field.name, value: selectedValues } });
                                            }}
                                        />
                                        <label htmlFor={option.value}>{option.label}</label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </form>

            <div>
                <button onClick={handleBack}>Back</button>

                {/* Button changes based on isReschedule */}
                {isReschedule ? (
                    <button className={styles.rescheduleButton} onClick={handleConfirmReschedule} >Confirm Reschedule</button>
                ) : (
                    <button className={styles.confirmButton} onClick={handleConfirm}>Confirm</button>
                )}
            </div>
        </div>
    );
};
