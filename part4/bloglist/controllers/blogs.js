const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1, id: 1 })

  res.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
    .populate('user', { username: 1, name: 1, id: 1 })

  res.json(blog.toJSON())
})

blogsRouter.post('/', async (req, res) => {
  const { body } = req

  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id,
    comments: []
  })
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const populatedBlog = await User.populate(savedBlog, { path: 'user', model: 'User', select: { username: 1, name: 1, id: 1 } })

  res.status(201).json(populatedBlog.toJSON())
})

blogsRouter.get('/:id/comments', async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  res.json(blog.comments)
})

blogsRouter.put('/:id/comments', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  blog.comments = blog.comments.concat(req.body.comment)
  await blog.save()

  res.json(blog.toJSON())
})

blogsRouter.delete('/:id', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(req.params.id)

  if (blog.user.toString() !== decodedToken.id.toString()) {
    return res.status(401).json({ error: 'wrong token' })
  }
  user.blogs = user.blogs.filter(b => b._id.toString() !== req.params.id.toString())
  await user.save()

  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { likes: req.body.likes },
    { new: true })

  res.json(updatedBlog.toJSON())
})

module.exports = blogsRouter