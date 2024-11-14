// components/ErrorPopup.js

import React from 'react';

const ErrorPopup = ({ message, onClose }) => {
    return (
        <div className="error-popup">
            <div className="error-message">{message}</div>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default ErrorPopup;
