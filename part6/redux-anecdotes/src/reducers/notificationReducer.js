const initialNotification = { text: 'welcome', visible: true }

const initialState = initialNotification

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return { text: action.data.text, visible: true }
    case 'CLEARNOTIFY':
      return { text: '', visible: false }
    default:
      return state
  }
}

export const setNotification = (text, duration) => {
  return async dispatch => {
    await dispatch(
      {
        type: 'NOTIFY',
        data: { text }
      }
    )
    setTimeout(() => {
      dispatch(
        {
          type: 'CLEARNOTIFY'
        }
      )
    }, duration * 1000)
  }
}

export const clearNotification = () => (
  {
    type: 'CLEARNOTIFY'
  }
)

export default notificationReducer