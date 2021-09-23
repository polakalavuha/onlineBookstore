import { useState, useEffect } from 'react'
import "./helpersStyles.css";

const Message = ({ variant, message }) => {
    const [show, setShow] = useState(true)

    useEffect(() => {
        const timeId = setTimeout(() => {
            setShow(false)
        }, 3000)

        return () => {
            clearTimeout(timeId)
        }
    }, []);

    if (!show) {
        return null;
    }

    return (
        <div className={`alert alert-${variant} alert-position`} role="alert">
            {message}
        </div>
    )
}

export default Message;