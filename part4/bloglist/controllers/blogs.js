const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})

  res.send(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (req, res) => {
  const { body } = req

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes
  })
  const savedBlog = await blog.save()
  res.status(201).json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (req, res) => {
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