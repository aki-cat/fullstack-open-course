const Filter = ({ filter, setFilter }) => {
    function onFilterChange(event) {
        setFilter(event.target.value);
    }

    return <p><input type='text' onChange={onFilterChange} value={filter} /></p>;
};

export default Filter;