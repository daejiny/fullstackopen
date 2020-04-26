import React from 'react'

const Notification = ({ message }) => {
    if ((message === null) || (message.text === '')) return null

    if (message.success === 1) {
        return (
            <div className="notification">
                {message.text}
            </div>
        )
    } else if (message.success === 0) {
        return (
            <div className="error">
                {message.text}
            </div>
        )
    }
}

export default Notification