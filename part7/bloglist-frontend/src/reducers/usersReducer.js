import usersService from '../services/users'

const initialState = []

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data
    case 'LOAD_USER':
      return action.data
    default:
      return state
  }
}

export const initUsers = () => {
  return async dispatch => {
    const users = await usersService.getAllUsers()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export const loadUser = (id) => {
  return async dispatch => {
    const user = await usersService.getUserById(id)
    dispatch({
      type: 'LOAD_USER',
      data: user
    })
  }
}

export default usersReducer