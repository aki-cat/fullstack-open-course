import PhoneNumber from './PhoneNumber';

const Persons = ({ persons, filter }) => {
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
                            <PhoneNumber key={person.name} name={person.name} number={person.number} />
                    )
            }
        </ul>
    </>;
};

export default Persons;