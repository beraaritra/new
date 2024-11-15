"use client";
import React from "react";
import styles from "./BookingReviewContent.module.css";

export const BookingReviewContent = ({ setModalView, bookingData, setBookingData, isReschedule, setIsReschedule, bookingDataResponse, setBookingDataResponse }) => {
    const handleReschedule = () => {
        setModalView("booking creation");
    };

    const handleCancel = () => {
        setBookingData({})
        setIsReschedule(false)
        setBookingDataResponse({})
        setModalView("thank you");
    };

    return (
        <div className={styles.modal_main}>
            <div className={styles.modal_header}>
                <h2>This meeting is scheduled</h2>
                <p>We sent an email with a calendar invitation with the details to you.</p>
            </div>
            <div className={styles.modal_content}>
                <div className={styles.detail}>
                    <strong>What</strong>
                    <span>{bookingData.title} Meeting</span>
                </div>
                <div className={styles.detail}>
                    <strong>When</strong>
                    <span>
                        {new Date(bookingData.startTime).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                        <br />
                        {new Date(bookingData.startTime).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })} - {new Date(bookingData.endTime).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })} (India Standard Time)
                    </span>
                </div>
                <div className={styles.detail}>
                    <strong>Who</strong>
                    <span>{bookingData.responses.name}</span>
                </div>
            </div>
            <div className={styles.modal_footer}>
                <p>Need to make a change?</p>
                <button className={styles.reschedule} onClick={handleReschedule}>Reschedule</button>
                <button className={styles.cancel} onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    );
};
