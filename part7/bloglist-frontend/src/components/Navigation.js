import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { logout } from '../reducers/authReducer'

import { Container, Menu } from 'semantic-ui-react'

const Navigation = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  const handleLogout = () => {
    dispatch(logout())
  }

  const loggedIn = () => (
    <>
      <Menu.Item>
        Hello, {auth.name}
      </Menu.Item>
      <Menu.Item position='right' as='a' href='/#' onClick={() => handleLogout()} id='logout-button'>
        Log Out
      </Menu.Item>
    </>
  )

  const loggedOut = () => (
    <Menu.Item position='right' as={Link} to='/login'>
      Log In
    </Menu.Item>
  )

  return (
    <Menu>
      <Container>
        <Menu.Item as={Link} to='/blogs'>
          Blogs
        </Menu.Item>

        <Menu.Item as={Link} to='/users'>
          Users
        </Menu.Item>

        {auth.token === '' ? loggedOut() : loggedIn()}
      </Container>
    </Menu>
  )
}

export default Navigation