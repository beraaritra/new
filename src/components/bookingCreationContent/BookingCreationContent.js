import React, { useState, useEffect } from "react";
import styles from "./BookingCreationContent.module.css";
import axios from "axios";
import dayjs from "dayjs";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";  // Styles for the calendar

export const BookingCreationContent = ({ setModalView, bookingData, setBookingData }) => {
    const [eventDetails, setEventDetails] = useState(null);
    const [timezones, setTimezones] = useState([]);
    const [selectedTimezone, setSelectedTimezone] = useState(bookingData.timeZone || "");
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState(bookingData.selectedDate || dayjs().format("YYYY-MM-DD"));


    console.log("eventDetails", eventDetails)
  


    useEffect(() => {
        console.log("Updated bookingData:", bookingData);
    }, [bookingData]);

    useEffect(() => {
        const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setSelectedTimezone(localTimezone);
        setBookingData((prev) => ({ ...prev, timeZone: localTimezone, time_zone: localTimezone }));
    }, []);

    useEffect(() => {
        axios.get("https://scheduling-api-development.lawsikho.dev/api/event/aquafinance-uq02hw")
            .then(response => setEventDetails(response.data.data[0]))
            .catch(error => console.error("Error fetching event details:", error));
    }, []);


    useEffect(() => {
        if (eventDetails) {
            setBookingData((prev) => ({
                ...prev,
                eventId: eventDetails.id,
                title: eventDetails.title,
                scheduleId: eventDetails.scheduleId,
                userId: eventDetails.userId,
                teamId: eventDetails.teamId
            }));
        }
    }, [eventDetails, setBookingData]);


    useEffect(() => {
        if (selectedTimezone) {
            axios.get(`https://scheduling-api-development.lawsikho.dev/api/public/v1/timezones?first=${selectedTimezone}`)
                .then(response => setTimezones(Object.keys(response.data.timezones)))
                .catch(error => console.error("Error fetching timezones:", error));
        }
    }, [selectedTimezone]);

    const fetchSlots = (date) => {
        const isToday = dayjs(date).isSame(dayjs(), 'day');
        const startDate = isToday ? dayjs().format("YYYY-MM-DD HH:mm:ss") : `${date} 00:00:00`;
        const endDate = `${date} 23:59:59`;

        axios.get("https://scheduling-api-development.lawsikho.dev/api/public/v1/team/slots", {
            params: {
                eventId: 809,
                startDate,
                endDate,
                timeZone: selectedTimezone,
                teamId: 205
            }
        })
            .then(response => setAvailableSlots(response.data.slots))
            .catch(error => console.error("Error fetching slots:", error));
    };

    useEffect(() => {
        if (selectedTimezone) {
            fetchSlots(selectedDate);
        }
    }, [selectedDate, selectedTimezone]);

    const handleDateChange = (date) => {
        const formattedDate = dayjs(date).format("YYYY-MM-DD");
        setSelectedDate(formattedDate);
        setBookingData((prev) => ({
            ...prev,
            selectedDate: dayjs(date).toISOString(),
        }));
        fetchSlots(formattedDate);
    };

    const handleTimezoneChange = (event) => {
        const timezone = event.target.value;
        setSelectedTimezone(timezone);
        setBookingData((prev) => ({
            ...prev,
            timeZone: timezone,
            time_zone: timezone,
        }));
    };

    const handleSlotSelect = (slot) => {
        setBookingData((prev) => ({
            ...prev,
            selectedSlot: dayjs(slot.time).format("YYYY-MM-DD HH:mm:ss"),
            startTime: dayjs(slot.time).format("YYYY-MM-DD HH:mm:ss"),
            endTime: dayjs(slot.time).add(eventDetails.length, 'minute').format("YYYY-MM-DD HH:mm:ss"),
        }));
    };

    const handleNext = () => {
        setModalView("booking confirm");
    };

    const handleBack = () => {
        setModalView("form");
    };

    useEffect(() => {
        setBookingData((prev) => ({
            ...prev,
            timeZone: selectedTimezone || prev.timeZone,
            selectedDate: selectedDate || prev.selectedDate,
        }));
    }, [selectedTimezone, selectedDate, setBookingData]);


    return (
        <div className={styles.modal_main}>
            <h2>Booking Creation</h2>
            <p>Please fill in your booking details</p>

            {eventDetails && (
                <div>
                    <h3>{eventDetails.title}</h3>
                    <div
                        dangerouslySetInnerHTML={{ __html: eventDetails.description }}
                    />
                    <p>Duration: {eventDetails.length} mins</p>
                </div>
            )}

            <div>
                <label>
                    {/* Date:
                    <DatePicker
                        selected={dayjs(selectedDate).toDate()}
                        onChange={handleDateChange}
                        minDate={new Date()}
                        inline
                        closeOnScroll={false}
                    /> */}

                    Date:
                    <Calendar
                        onChange={handleDateChange}  // handle date selection
                        value={selectedDate}         // pass current selected date
                        minDate={new Date()}         // Restrict past dates
                        className={`${styles.calendar} ${bookingData?.selectedDate ? styles.selectedDate : ""}`}  // Apply selectedDate style
                    />
                </label>
            </div>

            <div>
                <label>
                    Timezone:
                    <select value={selectedTimezone} onChange={handleTimezoneChange}>
                        {timezones.map((timezone) => (
                            <option key={timezone} value={timezone}>
                                {timezone}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div>
                <h4>Available Slots</h4>
                {availableSlots.length > 0 ? (
                    availableSlots.map((slot, index) => (
                        <button
                            key={index}
                            className={`${styles.slotButton} ${bookingData?.selectedSlot == slot.time ? styles.selectedSlot : ""}`}
                            onClick={() => handleSlotSelect(slot)}
                        >
                            {dayjs(slot.time).format("hh:mm A")}
                        </button>
                    ))
                ) : (
                    <p>No slots available for the selected date.</p>
                )}
            </div>

            <button onClick={handleBack}>Back</button>
            <button onClick={handleNext}>Next</button>
        </div>
    );
};
