import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personsService from './services/Persons'
import Notification from './Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const [errorMessage, setErrorMessage] = useState({
    text: '',
    success: -1,
  })

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (e) => {
    e.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    if (persons.filter(person => person.name === newName).length > 0) {
      if (persons.filter(person => person.number !== newNumber)) {
        if (window.confirm(`Update ${newName}'s phone number to ${newNumber}?`)) {
          personsService
            .update(getIdFromName(newName), newPerson)
            .then(response => {
              const newError = {text: `${newName}'s number updated to ${newNumber}`, success: 1}
              setErrorMessage(newError)
              setTimeout(() => setErrorMessage(null), 3000)
              setPersons(persons.map(person => person.id !== getIdFromName(newName) ? person : response.data))
            })
            .catch(error => {
              const newError = { text: `${error.response.data.error}`, success: 0 }
              setErrorMessage(newError)
              setTimeout(() => setErrorMessage(null), 3000)
            })
          return true
        }
      }
      else {
        alert(`${newName} is already added to phonebook`)
        return false
      }
    }
    personsService
      .add(newPerson)
      .then(response => {
        const newError = {text: `${newName} added to phonebook`, success: 1}
        setErrorMessage(newError)
        setTimeout(() => setErrorMessage(null), 3000)
        setPersons(persons.concat(response.data))
      })
      .catch(error => {
        const newError = { text: `${error.response.data.error}`, success: 0 }
        setErrorMessage(newError)
        setTimeout(() => setErrorMessage(null), 3000)
      })
  }

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${getNameFromId(id)}?`))
      personsService
        .remove(id)
        .then(response => {
          const newError = { text: `${getNameFromId(id)} deleted`, success: 1 }
          setErrorMessage(newError)
          setTimeout(() => setErrorMessage(null), 3000)
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          const newError = { text: `${error.response.data.error}`, success: 0 }
          setErrorMessage(newError)
          setTimeout(() => setErrorMessage(null), 3000)
          setPersons(persons.filter(person => person.name !== name))
        })
  }

  const getNameFromId = (id) => {
    return persons.filter(person => person.id === id)[0].name
  }

  const getIdFromName = (name) => {
    return persons.filter(person => person.name.toLowerCase() === name.toLowerCase())[0].id
  }

  const personsFilter = (newFilter.length === 0)
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter filter={newFilter} setFilter={setNewFilter} />
      <h3>Add a new</h3>
      <PersonForm name={newName} number={newNumber} setName={setNewName} setNumber={setNewNumber} handleClick={addPerson} />
      <h3>Numbers</h3>
      <Persons personList={personsFilter} removePerson={removePerson} />
    </div>
  )
}

export default App