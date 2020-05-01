import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if ((notification === null) || (notification.text === '' || (!notification.visible))) return null

  if (notification.type === 'info') {
    return (
      <div className="notification">
        {notification.text}
      </div>
    )
  } else if (notification.type === 'error') {
    return (
      <div className="error">
        {notification.text}
      </div>
    )
  } else {
    return null
  }
}

export default Notification