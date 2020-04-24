require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

const Person = require('./models/person')

morgan.token('postbody', function getPostBody(req) {
  if (req.method === 'POST') return JSON.stringify(req.body)
  else return
})

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postbody'))

app.get('/info', (req, res, next) => {
  Person.countDocuments({}).then(count => {
    res.send(`<p>Phonebook has info for ${count} people</p>
        <p>${new Date().toISOString()}</p>`)
  })
    .catch(e => next(e))
})

app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
    .catch(e => next(e))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id).then(() => {
    res.status(204).end()
  })
    .catch(e => next(e))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    if (person) {
      res.json(person.toJSON())
    } else {
      res.status(404).end()
    }
  })
    .catch(e => next(e))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON())
    })
    .catch(e => next(e))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.save().then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
      res.json(savedAndFormattedPerson)
    })
    .catch(e => next(e))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (e, req, res, next) => {
  console.error(e.name, e.message)

  if (e.name === 'CastError') {
    return res.status(400).send({ error: 'bad id' })
  } if (e.name === 'ValidationError') {
    return res.status(400).json({ error: e.message })
  }

  next(e)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server now running on ${PORT}`)
})