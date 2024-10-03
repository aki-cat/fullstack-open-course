import { useState } from 'react'
import PhoneNumber from './components/PhoneNumber'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newPerson, setNewPerson] = useState({
    name: "",
    number: ""
  });

  const [filter, setFilter] = useState("");

  function changeNewName(event) {
    console.log("name", event.target.value);
    setNewPerson(
      {
        ...newPerson,
        name: event.target.value,
      }
    );
  }

  function changeNewNumber(event) {
    console.log("number", event.target.value);
    setNewPerson(
      {
        ...newPerson,
        number: event.target.value,
      }
    );
  }

  function submitNewPerson(event) {
    event.preventDefault();

    // Case sensitive
    if (persons.find(person => person.name === newPerson.name)) {
      alert(`${newPerson.name} has already been added to Phonebook.`);
      return;
    }

    setPersons(persons.concat([newPerson]));
  }

  function setSearchQuery(event) {
    setFilter(event.target.value);
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Lookup</h2>
      <div>
        <label for='search'>Find</label>
        <input name='search' type='text' onChange={setSearchQuery} value={filter} />
      </div>
      <h2>New entry</h2>
      <form onSubmit={submitNewPerson}>
        <div>
          <div>
            <label htmlFor='name'>Name</label>:
            <input name='name' type='text' onChange={changeNewName} value={newPerson.name} />
          </div>
          <div>
            <label htmlFor='number'>Number</label>:
            <input name='number' type='text' onChange={changeNewNumber} value={newPerson.number} />
          </div>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <div>
        <h2>Numbers</h2>
        <ul>
          {persons.filter(person =>
            person.name.match(new RegExp(filter, 'i'))
          ).map(person => {
            return <PhoneNumber key={person.name} name={person.name} number={person.number} />
          })}
        </ul>
      </div>
    </div>
  );
}

export default App