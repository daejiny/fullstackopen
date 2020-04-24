const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')


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
    likes: 2,
  }

  await api
    .post('/api/blogs')
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

  const poopy = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(poopy.body.likes).toBe(0)
})

afterAll(() => {
  mongoose.connection.close()
})

test('400 on empty title or url', async () => {
  const newBlog = {
    title: '',
    author: 'Oliver Reichenstein',
    url: ''
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})