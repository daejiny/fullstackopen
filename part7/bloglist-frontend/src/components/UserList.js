import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { initUsers } from '../reducers/usersReducer'

import { Container, Table, Header } from 'semantic-ui-react'

const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initUsers())
  }, [dispatch])

  return (
    <Container text>
      <Header as='h1'>Users</Header>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Blogs Created</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users
            .sort((a, b) => b.blogs.length - a.blogs.length)
            .map(user => {
              return (
                <Table.Row key={user.id}>
                  <Table.Cell><Link to={`/users/${user.id}`}>{user.name}</Link></Table.Cell>
                  <Table.Cell>{user.blogs.length}</Table.Cell>
                </Table.Row>
              )
            }
            )}
        </Table.Body>
      </Table>
    </Container>
  )
}

export default UserList