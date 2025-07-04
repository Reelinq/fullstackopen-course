import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  const [searchValue, setSearchValue] = useState('')
  const [countries, setCountries] = useState(null)

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response =>
        setCountries(response.data)
      )
  }, [])

  return (
    <div>
        <div>find countries <input value={searchValue} onChange={(event) => setSearchValue(event.target.value)}/></div>
        <Countries countries={countries} searchValue={searchValue} setSearchValue={setSearchValue}/>
    </div>
  )
}

export default App