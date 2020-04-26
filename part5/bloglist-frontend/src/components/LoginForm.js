import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ setUser, sendNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLoginSubmit = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (e) {
      sendNotification('Wrong username or password', 0)
    }
  }

  return (
    <div>
      <h2>Log In</h2>
      <form onSubmit={handleLoginSubmit}>
        <div>
          username
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id='login-button'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm