const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypyt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const jwt = require('jsonwebtoken')


beforeEach(async () => {
  await Blog.deleteMany({})

  for (const blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    blogObject.save()
  }
})

test('6 blogs are returned', async () => {
  const res = await api.get('/api/blogs')

  expect(res.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier is id', async () => {
  const res = await api.get('/api/blogs')

  for (const blog of res.body) {
    expect(blog.id).toBeDefined()
  }
})

test('new blog created', async () => {
  const newBlog = {
    title: 'The 100% Easy-2-Read Standard',
    author: 'Oliver Reichenstein',
    url: 'https://ia.net/topics/100e2r',
    likes: 2
  }

  const user = await User.findOne({ username: 'moon' })

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const title = blogsAtEnd.map(blog => blog.title)
  expect(title).toContain('The 100% Easy-2-Read Standard')
})

test('default 0 likes', async () => {
  const newBlog = {
    title: 'The 100% Easy-2-Read Standard',
    author: 'Oliver Reichenstein',
    url: 'https://ia.net/topics/100e2r'
  }

  const user = await User.findOne({ username: 'moon' })

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  const newPost = await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(newPost.body.likes).toBe(0)
})

test('400 on empty title or url', async () => {
  const newBlog = {
    title: '',
    author: 'Oliver Reichenstein',
    url: ''
  }

  const user = await User.findOne({ username: 'moon' })

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('401 on missing token', async () => {
  const newBlog = {
    title: 'The 100% Easy-2-Read Standard',
    author: 'Oliver Reichenstein',
    url: 'https://ia.net/topics/100e2r'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypyt.hash('bingbong', 10)
    const user = new User({ username: 'moon', name: 'moonmoon', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'daejiny',
      name: 'Dae Jin Yuk',
      password: 'bingbong'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with a duplicate username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'moon',
      name: 'nada',
      password: 'bingbong'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with a short username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'dj',
      name: 'Dae Jin Yuk',
      password: 'bingbong'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with a short password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'daejiny',
      name: 'Dae Jin Yuk',
      password: 'bb'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})