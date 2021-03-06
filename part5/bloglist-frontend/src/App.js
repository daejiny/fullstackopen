import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [errorMessage, setErrorMessage] = useState({
    text: '',
    success: -1,
  })

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

  const handleLogout = async () => {
    console.log('logging out')

    try {
      window.localStorage.removeItem('loggedBlogappUser')
      blogService.setToken('')
      setUser(null)
    } catch (e) {
      sendNotification('Couldn\'t log out', 0)
    }
  }

  const sendNotification = (text, success, timeout = 5000) => {
    setErrorMessage({ text, success })
    setTimeout(() => {
      setErrorMessage(null)
    }, timeout)
  }

  const loginMenu = () => {
    return (
      <LoginForm
        setUser={setUser}
        sendNotification={sendNotification}
      />
    )
  }

  const handleLike = async (b) => {
    try {
      await blogService.likeBlog(b)
      setBlogs(
        blogs.map(blog => (blog.id === b.id) ? { ...blog, likes: b.likes + 1 } : blog)
      )
    } catch (e) {
      console.log('like blog failed')
    }
  }

  const handleDelete = async (b) => {
    try {
      if (window.confirm(`Remove blog ${b.title} by ${b.author}?`)) {
        await blogService.deleteBlog(b)
        setBlogs(blogs.filter(blog => b.id !== blog.id))
        sendNotification(`${b.title} deleted`, 1)
      }
    } catch (e) {
      console.log('delete blog failed')
    }
  }

  const handleAdd = async (b) => {
    try {
      await blogService.create(b)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      sendNotification(`Submitted ${b.title} by ${b.author}`, 1)
      return true
    } catch (e) {
      sendNotification('Couldn\'t submit blog', 0)
      return false
    }
  }

  const blogList = () => {
    return (
      <div>
        <h2>blogs</h2>
        <p>hello {user.name} <button onClick={() => handleLogout()} id='logout-button'>Log Out</button></p>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog => <Blog key={blog.id} blog={blog} user={user} handleLike={handleLike} handleDelete={handleDelete} />)}
        <Togglable buttonLabel='New Blog' id='show-blog-form-button'>
          <BlogForm
            handleAdd={handleAdd}
          />
        </Togglable>
      </div>
    )
  }
  const errorDiv = () => (
    <Notification message={errorMessage} />
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