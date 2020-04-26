import React, { useState } from 'react'

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  const [blogInfoVisible, setBlogInfoVisible] = useState(false)

  const toggleBlogInfo = () => setBlogInfoVisible(!blogInfoVisible)

  const showWhenVisible = { display: blogInfoVisible ? '' : 'none' }

  return (
    <div className='blog' style={{ border: '1px solid black', padding: '1rem', margin: '1rem' }}>
      {blog.title} {blog.author} <button onClick={toggleBlogInfo}>{blogInfoVisible ? 'hide' : 'show'}</button>
      <div style={showWhenVisible} className='togglableContent'>
        URL: <a href={blog.url}>{blog.url}</a><br />
        Likes: {blog.likes}<button onClick={() => handleLike(blog)}>like</button><br />
        User: {blog.user.name}<br />
        <button style={{ display: blog.user.username === user.username ? '' : 'none' }} onClick={() => handleDelete(blog)}>remove</button>
      </div>
    </div>
  )
}

export default Blog