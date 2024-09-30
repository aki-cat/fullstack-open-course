import { useState } from 'react'
import PhoneNumber from './components/PhoneNumber'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: 1234567890
    }
  ])

  const [newPerson, setNewPerson] = useState({
    name: "",
    number: ""
  });

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

  return (
    <div>
      <h2>Phonebook</h2>
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
          {persons.map(person => {
            return <PhoneNumber key={person.name} name={person.name} number={person.number} />
          })}
        </ul>
      </div>
    </div>
  );
}

export default App