import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { login } from '../reducers/authReducer'
import { setNotification } from '../reducers/notificationReducer'

import { Form } from 'semantic-ui-react'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await dispatch(login(username, password))
      dispatch(setNotification('Login successful', 'info'))
    } catch (e) {
      dispatch(setNotification('Wrong username or password', 'error'))
    }
  }

  return (
    <div>
      <h2>Log In</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          required
          icon='user'
          iconPosition='left'
          label='Username:'
          id='username'
          placeholder='Username'
          name='username'
          onChange={(e, { value }) => setUsername(value)}
        />
        <Form.Input
          required
          icon='lock'
          iconPosition='left'
          label='Password:'
          id='password'
          placeholder='Password'
          name='password'
          type='password'
          onChange={(e, { value }) => setPassword(value)}
        />
        <Form.Button content="Log In" id='login-button' />
      </Form>
    </div >
  )
}

export default LoginForm