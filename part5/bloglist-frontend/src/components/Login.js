import React from 'react'

const Login = ({ loginHandler, setUsername, setPassword, username, password }) => (
  <form onSubmit={loginHandler}>
    <div>
      username
      <input
        typ="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
      <input
        typ="text"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">Login</button>
  </form>
)

export default Login