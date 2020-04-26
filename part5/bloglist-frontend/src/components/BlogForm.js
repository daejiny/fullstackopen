import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ setBlogs, sendNotification }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const handleBlogSubmit = async (event) => {
    event.preventDefault()

    try {
      await blogService.create({ title: blogTitle, author: blogAuthor, url: blogUrl })
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      setBlogAuthor('')
      setBlogTitle('')
      setBlogUrl('')
      sendNotification(`Submitted ${blogTitle} by ${blogAuthor}`, 1)
    } catch (e) {
      sendNotification('Couldn\'t submit blog', 0)
    }
  }

  return (
    <div>
      <form onSubmit={handleBlogSubmit}>
        <div>
          title:
          <input
            type="text"
            value={blogTitle}
            name="Blog Title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={blogAuthor}
            name="Blog Author"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
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

export default BlogForm