const initialNotification = { text: 'welcome', visible: true }

const initialState = initialNotification

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return { ...state, text: action.data.text, visible: true }
    case 'CLEARNOTIFY':
      return { ...state, text: '', visible: false }
    default:
      return state
  }
}

let notifid = null

export const setNotification = (text, duration) => {
  return async dispatch => {
    clearTimeout(notifid)
    await dispatch(
      {
        type: 'NOTIFY',
        data: { text }
      }
    )
    notifid = setTimeout(() => {
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