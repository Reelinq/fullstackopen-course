import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/filter'
import Persons from './components/Persons'
import PersonForm from './components/personForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = event => {
    event.preventDefault()

    if (newName.trim() === '' || newNumber.trim() === '') return

    const existingPerson = persons.find(
      person => person.name.toLowerCase() === newName.toLowerCase()
    )
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        updateNumber(existingPerson.id, newNumber)
      }
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

    personService
      .create(newPerson)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const removePerson = personId => {
  personService
    .remove(personId)
    .then(() => {
      setPersons(persons.filter(person => person.id !== personId))
    })
  }

  const updateNumber = (personId, newNumber) => {
    const person = persons.find(person => person.id === personId)
    const changedPerson = { ...person, number: newNumber }

    personService
    .update(personId, changedPerson)
    .then(data => {
      setPersons(persons.map(person => person.id !== personId ? person : data))
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} setNewSearch={setNewSearch} />
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} />
      <h3>Numbers</h3>
      <Persons persons={persons} newSearch={newSearch} removePerson={removePerson} />
    </div>
  )

}

export default App