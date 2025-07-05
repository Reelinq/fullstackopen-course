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

app.get('/api/persons', (request, response) => {
  Person.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/info', (request, response) => {
  Person.countDocuments({}).then(count => {
    const time = new Date()
    response.send(`<p>Phonebook has info for ${count} people</p>
      <p>${time.toString()}</p>`)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
})

app.delete('/api/persons/:id', (request, response) => {
  Person.deleteOne({ _id: request.params.id })
    .then(() => {response.status(204).end()})
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }

  if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

  Person.findOne({ name: body.name }).then(existingPerson => {
    if (existingPerson) {
      return response.status(409).json({ 
        error: 'name already exists' 
      })
    }
  })

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

