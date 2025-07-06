require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', (req) => (req.method === 'POST' ? JSON.stringify(req.body) : ''))
const customFormat = ':method :url :status :res[content-length] - :response-time ms :body'
app.use((req, res, next) => {
  if (req.method === 'POST') {
    morgan(customFormat)(req, res, next)
  } else {
    morgan('tiny')(req, res, next)
  }
})

app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(notes => {
    response.json(notes)
  }).catch(error => next(error))
})

app.get('/info', (request, response, next) => {
  Person.countDocuments({}).then(count => {
    const time = new Date()
    response.send(`<p>Phonebook has info for ${count} people</p>
      <p>${time.toString()}</p>`)
  }).catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {response.status(204).end()})
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  let responded = false

  Person.findOne({ name: body.name }).then(() => {
    if (responded) return

    const person = new Person({
      name: body.name,
      number: body.number
    })

    person.save().then(savedPerson => {
      if (responded) return
      responded = true
      response.json(savedPerson)
    }).catch(error => {
      if (!responded) {
        responded = true
        next(error)
      }
    })
  })
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted id' })
  } else if (error.name === 'MongoServerError') {
    return response.status(500).send({ error: 'Database server error' })
  } else if (error.name === 'MongoNetworkError') {
    return response.status(503).send({ error: 'Database connection error' })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

