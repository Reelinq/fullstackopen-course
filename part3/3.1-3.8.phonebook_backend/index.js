const express = require('express')
const morgan = require('morgan')
const app = express()

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

let persons = [
    {
      id: '1',
      name: 'Arto Hellas',
      number: '040-123456'
    },
    {
      id: '2',
      name: 'Ada Lovelace',
      number: '39-44-5323523'
    },
    {
      id: '3',
      name: 'Dan Abramov',
      number: '12-43-234345'
    },
    {
      id: '4',
      name: 'Mary Poppendieck',
      number: '39-23-6423122'
    }
  ]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const time = new Date()
  response.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${time.toString()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const getRandomChar = () => {
    const randChar = characters[Math.floor(Math.random() * characters.length)]
    return Math.random() < 0.5 ? randChar.toLowerCase() : randChar
  }

  return Array.from({ length: 4 }, getRandomChar).join('')
}

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

  if (persons.find(person => person.name === body.name)) {
    return response.status(409).json({ 
      error: 'name already exists' 
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }
  

  persons = persons.concat(person)

  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

