import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { initUsers } from '../reducers/usersReducer'

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
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => {
          return (<li key={blog.id}>{blog.title}</li>)
        })}
      </ul>
    </div>
  )
}

export default User