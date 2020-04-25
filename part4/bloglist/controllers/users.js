const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})

  res.send(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (req, res) => {
  const { body } = req

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })
  const savedUser = await user.save()
  res.json(savedUser.toJSON())
})

usersRouter.delete('/:id', async (req, res) => {
  await User.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

usersRouter.put('/:id', async (req, res) => {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(req.body.password, saltRounds)

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { passwordHash },
    { new: true })

  res.json(updatedUser.toJSON())
})

module.exports = usersRouter