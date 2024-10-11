import PhoneNumber from './PhoneNumber';
import personsdb from "../services/personsdb";

const Persons = ({ setPersons, persons, filter }) => {

    function onClickRemoveButton(deletedPerson) {
        if (window.confirm(`Delete ${deletedPerson.name}?`)) {
            personsdb.remove(deletedPerson.id)
                .then(_ => setPersons(persons.filter(person => person.id !== deletedPerson.id)))
                .catch(error => {
                    console.error(error);
                    alert(error);
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