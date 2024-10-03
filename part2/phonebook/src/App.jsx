import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  const [filter, setFilter] = useState("");

  const [newPerson, setNewPerson] = useState({
    name: "",
    number: ""
  });

  function setSearchQuery(event) {
    setFilter(event.target.value);
  }

  function changeNewName(event) {
    setNewPerson(
      {
        ...newPerson,
        name: event.target.value,
      }
    );
  }

  function changeNewNumber(event) {
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
      <h1>Phonebook</h1>

      <Filter filter={filter} setSearchQuery={setSearchQuery} />
      <PersonForm submitNewPerson={submitNewPerson} changeNewName={changeNewName} changeNewNumber={changeNewNumber} newPerson={newPerson} />
      <Persons persons={persons} filter={filter} />

    </div>
  );
};

export default App;