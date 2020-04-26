import React, { useState } from 'react'
import blogsService from '../services/blogs'

const Blog = ({ blog, user }) => {
  const [blogInfoVisible, setBlogInfoVisible] = useState(false)
  const [blogLikes, setBlogLikes] = useState(blog.likes)

  const toggleBlogInfo = () => setBlogInfoVisible(!blogInfoVisible)

  const showWhenVisible = { display: blogInfoVisible ? '' : 'none' }

  // fix so that you can like more than one time per page load
  // will most probably have to reload the blog object
  const handleLike = async (b) => {
    try {
      const newBlog = await blogsService.likeBlog(b)
      setBlogLikes(newBlog.likes)
    } catch (e) {
      console.log('like blog failed')
    }
  }

  const handleDelete = async (b) => {
    try {
      if (window.confirm(`Remove blog ${b.title} by ${b.author}?`)) {
        await blogsService.deleteBlog(b)
      }
    } catch (e) {
      console.log('delete blog failed')
    }
  }

  console.log(blog.user.username, user.username, blog.user.username === user.username )

  return (
    <div style={{ border: '1px solid black', padding: '1rem', margin: '1rem' }}>
      {blog.title} {blog.author} <button onClick={toggleBlogInfo}>{blogInfoVisible ? 'hide' : 'show'}</button>
      <div style={showWhenVisible}>
        URL: <a href={blog.url}>{blog.url}</a><br />
        Likes: {blogLikes}<button onClick={() => handleLike(blog)}>like</button><br />
        User: {blog.user.name}<br />
        <button style={{display: blog.user.username === user.username ? '' : 'none'}} onClick={() => handleDelete(blog)}>remove</button>
      </div>
    </div>
  )
}

export default Blog