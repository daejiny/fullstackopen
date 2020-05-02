import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { initUsers } from '../reducers/usersReducer'

import { Header, Segment, Container } from 'semantic-ui-react'

const User = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  const { id } = useParams()

  useEffect(() => {
    dispatch(initUsers())
  }, [dispatch])

  const user = users.find(user => id === user.id)

  if (!user) { return null }

  return (
    <Container text>
      <Header as='h1'>{user.name}</Header>
      <Header as='h2'>Submitted blogs</Header>
      <Segment.Group>
        {user.blogs.map(blog => {
          return (<Segment key={blog.id}><Link to={`/blogs/${blog.id}`}><p>{blog.title}</p></Link></Segment>)
        })}
      </Segment.Group>
    </Container>
  )
}

export default User