import { useState } from 'react'
import PhoneNumber from './components/PhoneNumber'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('');

  function changeNewName(event) {
    setNewName(event.target.value);
  }

  function submitNewName(event) {
    event.preventDefault();
    setPersons(persons.concat([{ name: newName }]));
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitNewName}>
        <div>
          name: <input type='text' onChange={changeNewName} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>
        <h2>Numbers</h2>
        <ul>
          {persons.map(person => {
            return <PhoneNumber key={person.name} name={person.name} />
          })}
        </ul>
      </div>
    </div>
  );
}

export default App