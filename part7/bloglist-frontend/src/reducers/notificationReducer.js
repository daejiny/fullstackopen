const initialState = {
  text: 'welcome',
  type: 'info',
  visible: false
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return { text: action.data.text, type: action.data.type, visible: true }
    case 'CLEAR_NOTIFICATION':
      return { text: '', type: '', visible: false }
    default:
      return state
  }
}

let notifid = null

export const setNotification = (text, type, duration = 5) => {
  return async dispatch => {
    clearTimeout(notifid)
    await dispatch(
      {
        type: 'NOTIFY',
        data: { text, type }
      }
    )
    notifid = setTimeout(() => {
      dispatch(
        {
          type: 'CLEAR_NOTIFICATION'
        }
      )
    }, duration * 1000)
  }
}

export const clearNotification = () => (
  {
    type: 'CLEAR_NOTIFICATION'
  }
)

export default notificationReducer