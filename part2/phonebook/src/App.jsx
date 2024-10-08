import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

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