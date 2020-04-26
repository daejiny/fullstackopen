import React, { useState } from 'react'

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  const [blogInfoVisible, setBlogInfoVisible] = useState(false)

  const toggleBlogInfo = () => setBlogInfoVisible(!blogInfoVisible)

  const showWhenVisible = { display: blogInfoVisible ? '' : 'none' }

  return (
    <div className='blog' style={{ border: '1px solid black', padding: '1rem', margin: '1rem' }}>
      {blog.title} {blog.author} <button onClick={toggleBlogInfo} className='toggle-visible-button'>{blogInfoVisible ? 'hide' : 'show'}</button>
      <div style={showWhenVisible} className='togglableContent'>
        URL: <a href={blog.url}>{blog.url}</a><br />
        <div className='likes-div'>Likes: {blog.likes}<button onClick={() => handleLike(blog)} className='like-button'>like</button><br /></div>
        User: {blog.user.name}<br />
        <div className='delete-div'><button style={{ display: blog.user.username === user.username ? '' : 'none' }} onClick={() => handleDelete(blog)} className='delete-button'>remove</button></div>
      </div>
    </div>
  )
}

export default Blog