const Countries = ({ countries, searchValue }) => {
  let output

  if (countries) {
    const filteredCountries = countries.filter(country =>
      country.name.common.toLowerCase().includes(searchValue.toLowerCase())
    )

    if (filteredCountries.length > 10) {
      output = 'Too many matches, specify another filter'
    } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
      output = filteredCountries.map(country => <p key={country.name.common}>{country.name.common}</p>)
    } else if (filteredCountries.length === 1) {
      const country = filteredCountries[0]
      output = (
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
        </>
      )
    }
  }

  return (
    <div>{output}</div>
  )
}

export default Countries