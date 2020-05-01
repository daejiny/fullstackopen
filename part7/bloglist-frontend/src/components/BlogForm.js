import React, { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const BlogForm = () => {
  const dispatch = useDispatch()

  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const handleAdd = async (event) => {
    event.preventDefault()
    const blog = { title: blogTitle, author: blogAuthor, url: blogUrl }
    try {
      await dispatch(addBlog(blog))
      dispatch(setNotification(`Submitted ${blog.title} by ${blog.author}`, 'info'))
      setBlogAuthor('')
      setBlogTitle('')
      setBlogUrl('')
    } catch (e) {
      dispatch(setNotification('Could not submit blog', 'error'))
    }
  }

  return (
    <div>
      <form onSubmit={handleAdd}>
        <div>
          title:
          <input
            id='title'
            type="text"
            value={blogTitle}
            name="Blog Title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            type="text"
            value={blogAuthor}
            name="Blog Author"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type="text"
            value={blogUrl}
            name="Blog URL"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button type="submit" id='submit-blog-button'>Create</button>
      </form>
    </div>
  )
}

export default BlogForm