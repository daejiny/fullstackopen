const initialFilter = ''

const initialState = initialFilter

const filterReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'FILTER':
      return action.data
    default:
      return state
  }
}

export const filterFor = (text) => (
  {
    type: 'FILTER',
    data: text
  }
)

export default filterReducer