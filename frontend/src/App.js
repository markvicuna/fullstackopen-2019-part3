import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const sendError = (message, successStatus) => {
    setError({
      message: message,
      success: successStatus
    })
    setTimeout(() => {
      setError(null)
    }, 4000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === personObject.name)) {

      if (window.confirm(`${personObject.name} is already added to the phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === personObject.name)
        const changedPerson = { ...person, number: newNumber }

        personService
          .update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== changedPerson.id ? p : returnedPerson))
            sendError(`Changed ${changedPerson.name}'s phone number`, true)
          })
          .catch(error => {
            sendError(`Information of ${changedPerson.name} has already been removed from the server`, false)
          })
      }

    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          sendError(`Added ${returnedPerson.name}`, true)
        })
        .catch(error => {
          sendError(error.response.data.error, false)
        })
    }
  }

  const removePerson = (id) => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id))
          sendError(`${person.name} has been successfully deleted.`, true)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification
        error={error}
      />

      <Filter
        filterValue={filter}
        onFilterChange={handleFilterChange}
      />

      <h2>add a new</h2>

      <PersonForm
        onNameChange={handleNameChange}
        nameValue={newName}
        onNumberChange={handleNumberChange}
        numberValue={newNumber}
        onSubmit={addPerson}
      />

      <h2>Numbers</h2>

      <Persons
        persons={persons}
        filter={filter}
        onRemovePerson={removePerson}
      />

    </div>
  )
}

export default App