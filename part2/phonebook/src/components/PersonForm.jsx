const PersonForm = ({ submitNewPerson, changeNewName, changeNewNumber, newPerson }) => {
    return <>
        <h2>New entry</h2>

        <form onSubmit={submitNewPerson}>
            <div>
                <label htmlFor='form-name'>Name</label>:
                <input id='form-name' type='text' onChange={changeNewName} value={newPerson.name} />
            </div>
            <div>
                <label htmlFor='form-number'>Number</label>:
                <input id='form-number' type='text' onChange={changeNewNumber} value={newPerson.number} />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    </>;
};

export default PersonForm;