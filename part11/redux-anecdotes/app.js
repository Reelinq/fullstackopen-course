import express from 'express'
import fs from 'fs'

const app = express()
const PORT = 5000

app.use(express.static('dist'))

app.use(express.json())

let anecdotes = JSON.parse(fs.readFileSync('./db.json', 'utf8')).anecdotes

app.get('/anecdotes', (req, res) => {
	res.json(anecdotes)
})

app.post('/anecdotes', (req, res) => {
	const newAnecdote = {
		...req.body,
		id: Math.floor(Math.random() * 100000).toString()
	}
	anecdotes.push(newAnecdote)

	fs.writeFileSync('./db.json', JSON.stringify({ anecdotes }, null, 2))
	res.json(newAnecdote)
})

app.put('/anecdotes/:id', (req, res) => {
	const id = req.params.id
	const updatedAnecdote = req.body

	anecdotes = anecdotes.map(a => a.id === id ? updatedAnecdote : a)

	fs.writeFileSync('./db.json', JSON.stringify({ anecdotes }, null, 2))
	res.json(updatedAnecdote)
})

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})