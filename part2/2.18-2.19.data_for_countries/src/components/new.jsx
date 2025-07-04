import { useState } from 'react';

const Countries = ({ countries, searchValue }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  if (!countries) {
    return null;
  }

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchValue.toLowerCase())
  );

  if (selectedCountry) {
    // Show detailed info for selected country
    const country = selectedCountry;
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        <h3>Languages</h3>
        <ul>
          {Object.entries(country.languages).map(([key, value]) => (
            <li key={key}>{value}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
        <button onClick={() => setSelectedCountry(null)}>Back</button>
      </div>
    );
  }

  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
    return (
      <div>
        {filteredCountries.map((country) => (
          <div key={country.name.common}>
            <p>{country.name.common}</p>
            <button onClick={() => setSelectedCountry(country)}>Show</button>
          </div>
        ))}
      </div>
    );
  } else if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    // Show detailed info directly
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        <h3>Languages</h3>
        <ul>
          {Object.entries(country.languages).map(([key, value]) => (
            <li key={key}>{value}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      </div>
    );
  } else {
    return null; // No countries match
  }
};

export default Countries;