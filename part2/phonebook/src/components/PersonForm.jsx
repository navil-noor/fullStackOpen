import personService from "../services/persons"
import Notification from "./Notification"


const [addMessage, setAddMessage] = useState('a message')

const PersonForm = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber }) => {

    const addName = (event) => {
    event.preventDefault()
    const newPerson = {name: newName, number: newNumber}
    const existingPerson = persons.find(x => x.name === newName)
    const numberChanged = {...existingPerson, number: newNumber}
    const message = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

    if (existingPerson) {
      if (message) {
        personService
          .update(existingPerson.id, numberChanged)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setAddMessage(
            `Number of '${newName}' was updated`
          )
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
                setAddMessage(null)
              }, 5000)
    })
          .catch(message => {
            setAddMessage(`Number not added for ${newName}`)
            setTimeout(() => {
              setAddMessage(null)
            }, 5000)
            setPersons(persons.filter(x => x.id !== existingPerson.id))
          })
      }
    } else {
        personService
          .create(newPerson)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setAddMessage(
            `Person '${newName}' was added to the server`
          )
            setNewName('')
            setNewNumber('')
          })
          .catch(message => {
            setAddMessage(`Cannot add ${newName}`)
          setTimeout(() => {
            setAddMessage(null)
          }, 5000)
        })
    }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    return (
        <form onSubmit={addName}>
        <div>
          name: <input value={newName}
          onChange={handleNameChange} 
        />
        </div>
        <div>
          number: <input value={newNumber}
          onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
        <div>
          <Notification message={addMessage}/>
        </div>
      </form>
    )
}

export default PersonForm