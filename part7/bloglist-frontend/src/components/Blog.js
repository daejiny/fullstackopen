import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

import { deleteBlog, likeBlog, toggleVisibility, commentBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { initializeBlogs } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const auth = useSelector(state => state.auth)

  const [commentField, setCommentField] = useState('')

  const { id } = useParams()

  useEffect(() => {
    if (!blog) dispatch(initializeBlogs())
  }, [dispatch, blog])

  if (!blog) blog = blogs.find(blog => blog.id === id)

  if (!blog) return null

  const toggleBlogInfo = () => dispatch(toggleVisibility(blog))

  const showWhenVisible = { display: blog.visible ? '' : 'none' }

  const handleDelete = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        await dispatch(deleteBlog(blog))
        dispatch(setNotification(`${blog.title} deleted`, 'info'))
      }
    } catch (e) {
      dispatch(setNotification(`${blog.title} could not be deleted`, 'error'))
    }
  }

  const handleLike = async (blog) => {
    try {
      await dispatch(likeBlog(blog))
      dispatch(setNotification(`${blog.title} liked`, 'info'))
    } catch (e) {
      dispatch(setNotification(`${blog.title} could not be liked`, 'error'))
    }
  }

  const handleComment = async (event) => {
    event.preventDefault()
    try {
      await dispatch(commentBlog(blog, commentField))
      dispatch(setNotification('Added comment', 'info'))
      setCommentField('')
    } catch (e) {
      dispatch(setNotification('Could not submit comment', 'error'))
    }
  }

  return (
    <div className='blog' style={{ border: '1px solid black', padding: '1rem', margin: '1rem' }}>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> {blog.author} <button onClick={toggleBlogInfo} className='toggle-visible-button'>{blog.visible ? 'hide' : 'show'}</button>
      <div style={showWhenVisible} className='togglableContent'>
        URL: <a href={blog.url}>{blog.url}</a><br />
        <div className='likes-div'>Likes: {blog.likes}<button onClick={() => handleLike(blog)} className='like-button'>like</button><br /></div>
        User: {blog.user.name}<br />
        <div className='delete-div'><button style={{ display: blog.user.username === auth.username ? '' : 'none' }} onClick={() => handleDelete(blog)} className='delete-button'>remove</button></div>
        <h4>Comments</h4>
        <ul>
          {
            blog.comments.map((comment, index) =>
              <li key={index}>{comment}</li>
            )
          }
        </ul>
        <form onSubmit={handleComment}>
          <div>
            comment:
            <input
              id='commentField'
              type="text"
              value={commentField}
              name="Comment Field"
              onChange={({ target }) => setCommentField(target.value)}
            />
          </div>
          <button type="submit">Add Comment</button>
        </form>
      </div>
    </div>
  )
}

export default Blog