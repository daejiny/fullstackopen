const initialNotification = { text: 'welcome', visible: true }

const initialState = initialNotification

const notificationReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'NOTIFY':
      return { text: action.data.text, visible: true }
    case 'CLEARNOTIFY':
      return { text: '', visible: false }
    default:
      return state
  }
}

export const setNotification = (text) => (
  {
    type: 'NOTIFY',
    data: { text }
  }
)

export const clearNotification = () => (
  {
    type: 'CLEARNOTIFY'
  }
)

export default notificationReducer