const Matches = ({ matches, setSelectedCountry, seletedCountry }) => {
    function isCountrySelected(countryData) {
        return seletedCountry !== null && countryData.cca3 === seletedCountry.cca3;
    }

    return matches.length <= 10
        ? <ul> {
            matches.map(countryData =>
                <li key={countryData.cca3}>
                    <span style={{ margin: 4 }}>{countryData.name.common}</span>
                    <button
                        style={{ margin: 4 }}
                        onClick={() => isCountrySelected(countryData) ? setSelectedCountry(null) : setSelectedCountry(countryData)}>
                        {isCountrySelected(countryData) ? "hide" : "show"}
                    </button>
                </li>)
        } </ul>
        : <p>Too many matches!</p>;
};

export default Matches;