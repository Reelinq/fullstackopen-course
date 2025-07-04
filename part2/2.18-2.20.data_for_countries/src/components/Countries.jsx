import Weather from './Weather'

const Countries = ({ countries, searchValue, setSearchValue }) => {

  if (countries) {
    const filteredCountries = countries.filter(country =>
      country.name.common.toLowerCase().includes(searchValue.toLowerCase())
    )

    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>

    } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
      return (
        <div>
          {filteredCountries.map((country) => (
          <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => setSearchValue(country.name.common)}>Show</button>
          </div>
          ))}
        </div>
      )
      
    } else if (filteredCountries.length === 1) {
      const country = filteredCountries[0]
      return (
        <>
          <h2>{country.name.common}</h2>
          <p>Capital {country.capital}</p>
          <p>Area {country.area}</p>
          <h3>Languages</h3>
          <ul>
          {Object.entries(country.languages).map(([key, value]) => (
              <li key={key}>{value}</li>
          ))}
          </ul>
          <img src={country.flags.png} alt=''></img>
          <Weather capital={country.capital} />
        </>
      )
    }
  }
}

export default Countries