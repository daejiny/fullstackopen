import React from 'react'
import { useSelector } from 'react-redux'

import { Message } from 'semantic-ui-react'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if ((notification === null) || (notification.text === '')) return null

  if (notification.type === 'info') {
    return (
      <Message positive>{notification.text}</Message>
    )
  } else if (notification.type === 'error') {
    return (
      <Message error>{notification.text}</Message>
    )
  } else {
    return null
  }
}

export default Notification