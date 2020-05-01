import React, { useEffect } from 'react'
import Notification from './components/Notification'
import Navigation from './components/Navigation'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import UserList from './components/UserList'
import User from './components/User'
import { useSelector, useDispatch } from 'react-redux'
import {
  Route, Switch,
  BrowserRouter as Router
} from 'react-router-dom'
import './App.css'

import { initAuth } from './reducers/authReducer'

const App = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(initAuth())
  }, [dispatch])

  const blogList = () => {
    return (
      <div>
        <h2>blogs</h2>
        <BlogList />
      </div>
    )
  }

  return (
    <Router>
      <Navigation />
      <Notification />
      {auth.token === '' && <LoginForm />}
      <Switch>
        <Route path="/blogs/:id">
          <Blog />
        </Route>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users">
          <UserList />
        </Route>
        <Route path="/">
          {auth.token !== '' && blogList()}
        </Route>
      </Switch>
    </Router>
  )
}

export default App