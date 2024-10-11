const CountryInfo = ({ countryData }) => {
    return <div>
        <h2>{countryData.name.common}</h2>
        <p>
            Capital: {
                countryData.capital
                    .map(capital => <span key={capital}>{capital}</span>)
                    .reduce((prev, curr) => [prev, ", ", curr])
            }
        </p>
        <p>Area: {countryData.area}</p>
        <h3>Languages</h3>
        <ul>
            {Object.entries(countryData.languages).map(([id, lang]) => <li key={id}>{lang}</li>)}
        </ul>

        <img src={countryData.flags.png} alt={countryData.flags.alt} />
    </div>;
};

export default CountryInfo;