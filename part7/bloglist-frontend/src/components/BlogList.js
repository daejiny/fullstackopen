import React, { useEffect, useState, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from '../components/BlogForm'

import { initializeBlogs } from '../reducers/blogReducer'

import { Container, Header, Accordion, Modal, Button } from 'semantic-ui-react'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const [activeIndex, setActiveIndex] = useState(-1)

  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index

    setActiveIndex(newIndex)
  }

  return (
    <Container text>
      <Header as='h1'>
        Blogs
        <Modal trigger={<Button style={{ margin: '1em' }}>Add Blog</Button>}>
          <Modal.Header>Add Blog</Modal.Header>
          <Modal.Content>
            <BlogForm />
          </Modal.Content>
        </Modal>
      </Header>
      <Accordion styled>
        {
          blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog, i) => {
              return (
                <Fragment key={blog.id}>
                  <Accordion.Title
                    active={activeIndex === i}
                    index={i}
                    onClick={handleClick}
                  >
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === i}>
                    <p>URL: <a href={blog.url}>{blog.url}</a></p>
                    <p className='likes-counter'>Likes: {blog.likes}</p>
                    <p>User: {blog.user.name}</p>
                    <p>Comments: {blog.comments.length}</p>
                  </Accordion.Content>
                </Fragment>
              )
            }
            )
        }
      </Accordion>
    </Container>
  )
}

export default BlogList