import React from 'react';

const LoadSpinner = ({ message }) => {
    return (
        <div>
            <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden"></span>
            </div>
            <span className="text-danger"> {message}</span>
        </div>
    );
}

export default LoadSpinner;