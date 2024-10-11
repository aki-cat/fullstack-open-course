const Matches = ({ matches }) => {
    return matches.length <= 10
        ? <ul> {matches.map(countryData => <li key={countryData.cca3}>{countryData.name.common}</li>)} </ul>
        : <p>Too many matches!</p>;
};

export default Matches;