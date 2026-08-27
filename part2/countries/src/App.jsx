import { useEffect, useState } from "react";
import Countries from "./components/Countries";
import Find from "./components/Find";
import countryService from './services/countries'

const App = () => {

  const [countries, setCountries] = useState(null)
  const [findCountry, setFind] = useState("")
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    countryService
      .getAll()
      .then(fetchedCountries => {
        setCountries(fetchedCountries)
      })
  }, [])

   if (!countries) { 
    return null 
  }


  return (
    <div>
      <Find findCountry={findCountry} setFind={setFind} />

      <Countries countries={countries} findCountry={findCountry} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />
    </div>
  )
}

export default App