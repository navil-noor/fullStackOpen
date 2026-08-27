import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearch] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(fetchedPersons => {
        setPersons(fetchedPersons)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchName={searchName} setSearch={setSearch} />

      <h2>Add a new</h2>

      <PersonForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />

      <h2>Numbers</h2>

      <Persons persons={persons} searchName={searchName} setPersons={setPersons} />
      
    </div>
  )
}

export default App