import PhoneNumber from './PhoneNumber';
import personsdb from "../services/personsdb";

const Persons = ({ setActionFeedback, setPersons, persons, filter }) => {

    function onClickRemoveButton(deletedPerson) {
        if (window.confirm(`Delete ${deletedPerson.name}?`)) {
            personsdb.remove(deletedPerson.id)
                .then(_ => {
                    setPersons(persons.filter(person => person.id !== deletedPerson.id));
                    setActionFeedback(true, `${deletedPerson.name} deleted successfully.`);
                })
                .catch(error => {
                    // console.error(error);
                    setPersons(persons.filter(person => person.id !== deletedPerson.id));
                    setActionFeedback(false, `${deletedPerson.name} was already deleted.`);
                });
        }
    };

    return <>
        <h2>Numbers</h2>
        <ul>
            {
                persons
                    .filter(
                        person => {
                            let expr;
                            try {
                                expr = new RegExp(filter, 'i');
                            } catch (error) {
                                console.error(`Invalid RegExp: ${error}`);
                                return true;
                            }
                            return person.name.match(expr);
                        }
                    )
                    .map(
                        person =>
                            <li key={person.id}>
                                <PhoneNumber name={person.name} number={person.number} />
                                <button onClick={() => onClickRemoveButton(person)}>Delete</button>
                            </li>

                    )
            }
        </ul>
    </>;
};

export default Persons;