import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';

const RESOURCE_PERSONS_URL = "http://localhost:3001/persons";
const DEFAULT_NEW_PERSON = {
  name: "",
  number: ""
};

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios.get(RESOURCE_PERSONS_URL).then((response) => {
      setPersons(response.data);
    });
  }, []);

  const [filter, setFilter] = useState("");

  const [newPerson, setNewPerson] = useState({
    ...DEFAULT_NEW_PERSON
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
      const error = `${newPerson.name} has already been added to Phonebook.`;
      console.error(error);
      alert(error);
      return;
    }

    axios.post(RESOURCE_PERSONS_URL, newPerson)
      .then(response => response.data)
      .then(insertedPerson => {
        setPersons(persons.concat([insertedPerson]));
        setNewPerson({
          ...DEFAULT_NEW_PERSON
        });
      })
      .catch(error => {
        console.error(error);
        alert(error);
      });
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