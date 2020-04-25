import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async () => {
    console.log('logging out')

    try {
      window.localStorage.removeItem('loggedBlogappUser')
      blogService.setToken('')
      setUser(null)
      setUsername('')
      setPassword('')
    } catch (e) {
      setErrorMessage('Couldn\'t log out')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleBlogSubmit = async (event) => {
    event.preventDefault()

    try {
      await blogService.create({ title: blogTitle, author: blogAuthor, url: blogUrl })
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      setBlogAuthor('')
      setBlogTitle('')
      setBlogUrl('')
      setErrorMessage('Submitted blog entry')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (e) {
      setErrorMessage('Couldn\'t submit blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginMenu = () => {
    return (
      <div>
        <h2>Log In</h2>
        <Login loginHandler={handleLogin} setUsername={setUsername} setPassword={setPassword} username={username} password={password} />
      </div>
    )
  }

  const blogList = () => {
    return (
      <div>
        <h2>blogs</h2>
        <p>hello {user.name} <button onClick={() => handleLogout()}>Log Out</button></p>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        <form onSubmit={handleBlogSubmit}>
          <div>
            title:
      <input
              typ="text"
              value={blogTitle}
              name="Blog Title"
              onChange={({ target }) => setBlogTitle(target.value)}
            />
          </div>
          <div>
            author:
      <input
              typ="text"
              value={blogAuthor}
              name="Blog Author"
              onChange={({ target }) => setBlogAuthor(target.value)}
            />
          </div>
          <div>
            url:
      <input
              typ="text"
              value={blogUrl}
              name="Blog URL"
              onChange={({ target }) => setBlogUrl(target.value)}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    )
  }
  const errorDiv = () => (
    <p className='error'>{errorMessage}</p>
  )

  return (
    <div>
      {errorMessage !== null && errorDiv()}
      {user === null && loginMenu()}
      {user !== null && blogList()}
    </div>
  )
}

export default App