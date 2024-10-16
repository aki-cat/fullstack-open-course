import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import axios from 'axios';
import Matches from './components/Matches';
import CountryInfo from './components/CountryInfo';

const API_URL = "https://studies.cs.helsinki.fi/restcountries/api";

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const [matches, setMatches] = useState([]);
  const [filter, setFilter] = useState("");
  const [seletedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/all`)
      .then(response => setCountriesData(response.data))
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    filter.length === 0
      ? setMatches([])
      : setMatches(countriesData.filter(countryData => countryData.name.common.match(new RegExp(`${filter}`, "i"))));
  }, [filter]);

  useEffect(() => {
    if (matches.length === 1) {
      setSelectedCountry(matches[0]);
    } else {
      setSelectedCountry(null);
    }
  }, [matches]);

  return (
    <>
      <div>
        <p>Find countries</p>
        {
          countriesData.length === 0
            ? <p>[Loading...]</p>
            : <Filter filter={filter} setFilter={setFilter} />
        }

        {
          matches.length > 1
            ? <Matches matches={matches} setSelectedCountry={setSelectedCountry} seletedCountry={seletedCountry} />
            : <></>
        }

        {
          seletedCountry !== null
            ? <CountryInfo countryData={seletedCountry} />
            : <></>
        }
      </div>
    </>
  );
}

export default App;
