import personService from "../services/persons"

const Persons = ({ persons, searchName, setPersons }) => {

    const personSearch = persons.filter(x => x.name.toLowerCase().includes(searchName.toLowerCase()))

    const deletePerson = (id, name) => {
      if (window.confirm(`Delete ${name}?`)) {
        personService
          .remove(id)
          .then(() => {setPersons(persons.filter(x => x.id !== id))})
      } else {
        "not deleted"
      }
    }

    return (
        <div>
        {personSearch.map(result => 
          <p key={result.id}>{result.name} {result.number} <button onClick={() => deletePerson(result.id, result.name)}>delete</button></p>
        )}
      </div>
    )
}

export default Persons