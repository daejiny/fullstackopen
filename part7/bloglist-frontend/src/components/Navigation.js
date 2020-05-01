import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { logout } from '../reducers/authReducer'

const Navigation = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  const handleLogout = () => {
    dispatch(logout())
  }

  const loggedIn = () => (
    <div>hello {auth.name} <button onClick={() => handleLogout()} id='logout-button'>Log Out</button></div>
  )

  const loggedOut = () => (
    <div></div>
  )

  return (
    <div>
      <Link to='/blogs'>blogs</Link>
      <Link to='/users'>users</Link>
      {auth.token === '' ? loggedOut(): loggedIn()}
    </div>
  )
}

export default Navigation