import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/filter'
import Persons from './components/Persons'
import PersonForm from './components/personForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [message, setMessage] = useState(null)

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
      }).catch(error => {
      setMessage(JSON.stringify(error.response.data.error).replace(/^"|"$/g, ''))
    })

    setMessage(
      `Added ${newName}`
    )
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const removePerson = personId => {
    personService
    .remove(personId)
    .then(() => {
      setPersons(persons.filter(person => person.id !== personId))
      setMessage(`Removed ${persons.find(person => person.id === personId).name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
  }

  const updateNumber = (personId, newNumber) => {
    const person = persons.find(person => person.id === personId)
    const changedPerson = { ...person, number: newNumber }

    const updatedPerson = persons.find(person => person.id === personId).name

    personService
    .update(personId, changedPerson)
    .then(data => {
      setPersons(persons.map(person => person.id !== personId ? person : data))
      setMessage(`Modifyed ${updatedPerson}`)
      setNewName('')
      setNewNumber('')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }).catch(error => {
        setMessage(
          `Information of ${updatedPerson} was already removed from server`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== personId))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter newSearch={newSearch} setNewSearch={setNewSearch} />
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} />
      <h3>Numbers</h3>
      <Persons persons={persons} newSearch={newSearch} removePerson={removePerson} />
    </div>
  )

}

export default App