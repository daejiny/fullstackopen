import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { deleteBlog, likeBlog, commentBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { initializeBlogs } from '../reducers/blogReducer'

import { Container, Form, List, Divider, Header, Button } from 'semantic-ui-react'

const Blog = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const auth = useSelector(state => state.auth)

  const [commentField, setCommentField] = useState('')

  const { id } = useParams()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blog = blogs.find(blog => blog.id === id)

  if (!blog) return null

  const handleDelete = async () => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        await dispatch(deleteBlog(blog))
        dispatch(setNotification(`${blog.title} deleted`, 'info'))
      }
    } catch (e) {
      dispatch(setNotification(`${blog.title} could not be deleted`, 'error'))
    }
  }

  const handleLike = async () => {
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
    <Container text className='blog'>
      <Header as='h1'>{blog.title}</Header>
      <Header as='h2'>By: {blog.author}</Header>
      <p>URL: <a href={blog.url}>{blog.url}</a></p>
      <p>User: {blog.user.name}</p>
      <Button
        color='blue'
        content='Like'
        icon='heart'
        className='like-button'
        onClick={handleLike}
        label={{ basic: true, color: 'blue', pointing: 'left', content: blog.likes }}
      />
      <Button
        negative
        content='Delete'
        className='delete-button'
        onClick={handleDelete}
        style={{ display: blog.user.username === auth.username ? '' : 'none' }}
      />
      <Divider />
      <Header as='h4'>Comments</Header>
      <List divided>
        {
          blog.comments.map((comment, index) =>
            <List.Item key={index}>
              <List.Icon name='right triangle' />
              <List.Content>{comment}</List.Content>
            </List.Item>
          )
        }
      </List>
      <Form onSubmit={handleComment}>
        <Form.Input
          id='comment-field'
          type="text"
          name="Comment Field"
          placeholder='I love this!'
          value={commentField}
          onChange={(e, { value }) => setCommentField(value)}
        />
        <Form.Button type="submit" content='Submit Comment' />
      </Form>
    </Container >
  )
}

export default Blog