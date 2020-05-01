import React, { useEffect } from 'react'
import Blog from '../components/Blog'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'

import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  return (
    <div>
      {
        blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => <Blog key={blog.id} blog={blog} />)
          // .map(blog => <p key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></p>)
      }
      <Togglable buttonLabel='New Blog' id='show-blog-form-button'>
        <BlogForm />
      </Togglable>
    </div>
  )
}

export default BlogList