const Filter = ({ filter, setSearchQuery }) => {
    return <>
        <h2>Lookup</h2>
        <div>
            <label htmlFor='form-search'>Find</label>
            <input id='form-search' type='text' onChange={setSearchQuery} value={filter} />
        </div>
    </>;
};

export default Filter;