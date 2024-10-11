import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsdb from './services/personsdb';
import FeedbackMessage from './components/FeedbackMessage';

const DEFAULT_NEW_PERSON = {
  name: "",
  number: ""
};

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personsdb.getAll().then((data) => setPersons(data));
  }, []);

  const [filter, setFilter] = useState("");

  const [newPerson, setNewPerson] = useState({
    ...DEFAULT_NEW_PERSON
  });

  const [message, setMessage] = useState({ success: false, message: "" });

  let timeout = null;
  function setActionFeedback(success, message) {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
    setMessage({ success, message });
    timeout = setTimeout(() => {
      setMessage({ success: false, message: "" });
      timeout = null;
    }, 5000);
  }

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
    const existingPerson = persons.find(person => person.name.match(new RegExp(`^${newPerson.name.trim()}$`, "i")));
    if (existingPerson) {
      if (window.confirm(`${newPerson.name} has already been added to Phonebook. Replace old number with new one?`)) {
        personsdb.update(existingPerson.id, { ...existingPerson, number: newPerson.number })
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person));
            setNewPerson({
              ...DEFAULT_NEW_PERSON
            });
            setActionFeedback(true, `${updatedPerson.name} updated successfully.`);
          })
          .catch(error => {
            // console.error(error);
            setPersons(persons.filter(person => person.id !== existingPerson.id));
            setActionFeedback(false, `${existingPerson.name} already removed from server.`);
          });
      }
      return;
    }

    personsdb.insert(newPerson)
      .then(insertedPerson => {
        setPersons(persons.concat([insertedPerson]));
        setNewPerson({
          ...DEFAULT_NEW_PERSON
        });
        setActionFeedback(true, `${insertedPerson.name} added successfully.`);
      })
      .catch(error => {
        // console.error(error);
        setActionFeedback(false, error);
      });
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <FeedbackMessage message={message.message} success={message.success} />
      <Filter filter={filter} setSearchQuery={setSearchQuery} />
      <PersonForm submitNewPerson={submitNewPerson} changeNewName={changeNewName} changeNewNumber={changeNewNumber} newPerson={newPerson} />
      <Persons setActionFeedback={setActionFeedback} setPersons={setPersons} persons={persons} filter={filter} />

    </div>
  );
};

export default App;