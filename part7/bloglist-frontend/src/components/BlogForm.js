import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'

import { Form } from 'semantic-ui-react'

const BlogForm = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const blog = { title, author, url }
    try {
      await dispatch(addBlog(blog))
      dispatch(setNotification(`Submitted ${blog.title} by ${blog.author}`, 'info'))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (e) {
      dispatch(setNotification('Could not submit blog', 'error'))
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        required
        label='Blog title:'
        placeholder='What is to be xan'
        name='title'
        value={title}
        onChange={(e, { value }) => setTitle(value)}
      />
      <Form.Input
        label='Blog author:'
        placeholder='Slattimir'
        name='author'
        value={author}
        onChange={(e, { value }) => setAuthor(value)}
      />
      <Form.Input
        required
        label='Blog URL:'
        placeholder='www.youtube.com'
        name='url'
        value={url}
        onChange={(e, { value }) => setUrl(value)}
      />
      <Form.Button content='Add Blog' id='submit-blog-button' />
    </Form>
  )
}

export default BlogForm