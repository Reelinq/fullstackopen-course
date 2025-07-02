import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ newSearch, setNewSearch }) => {
  return (
    <div>
      filter shown with: <input value={newSearch} onChange={(event) => setNewSearch(event.target.value)} />
    </div>
  )
}

const PersonForm = ({ addPerson, newName, newNumber, setNewName, setNewNumber }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
      </div>
      <div>
        number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, newSearch }) => {
  return (
    <>
      {persons
      .filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))
      .map(person => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (newName.trim() === '' || newNumber.trim() === '') return

    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    if (persons.some(person => person.number === newNumber)) {
      alert(`${newNumber} is already added to phonebook`)
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    axios
    .post('http://localhost:3001/persons', newPerson)
    .then((response) => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} setNewSearch={setNewSearch} />
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} />
      <h3>Numbers</h3>
      <Persons persons={persons} newSearch={newSearch} />
    </div>
  )

}

export default App