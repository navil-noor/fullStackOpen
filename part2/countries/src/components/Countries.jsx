import axios from "axios"
import { Fragment, useEffect } from "react"
import { useState } from "react"

const Countries = ({ countries, findCountry, selectedCountry, setSelectedCountry }) => {

    const [weatherData, setWeatherData] = useState(null)

    useEffect(() => {
        if (selectedCountry) {

            const capitalSelected = selectedCountry.capital[0]
            const apiKey = import.meta.env.VITE_WEATHER_API_KEY

            axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${capitalSelected}&appid=${apiKey}`)
            .then(response => {
            setWeatherData({
                temp: response.data.main.temp,
                wind: response.data.wind.speed,
                icon: response.data.weather[0].icon,
                description: response.data.weather[0].description
            })
            })
        } else {
            setWeatherData(null)
        }

    }, [selectedCountry])
    
    const searchCountry = countries.filter(x => {
        return x.name.common.toLowerCase().includes(findCountry.toLowerCase())
    })

    const countryDetails = (values) => {
            return (
                <div>
                    <h1>{values.name.common}</h1>

                    <p>Capital {values.capital}</p>
                    <p>Area {values.area}</p>

                    <h2>Languages</h2>

                    {values.languages == undefined ? (
                        <p>No languages available</p>
                    ) : (
                        <ul>
                        {Object.values(values.languages).map(language => (
                            <li key={language}>{language}</li>
                        ))}
                        </ul>
                    )}

                    <img src={values.flags.png} alt="flag" />

                    <h2>Weather in {values.capital}</h2>
                    {weatherData !== null ? (
                        <div>
                            <p>Temperature: {Math.round(weatherData.temp - 273.15)} °C</p>
                            <img src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt="weather icon" />
                            <p>Wind: {weatherData.wind} m/s</p>
                        </div>
                        ) : null}
                </div>
            )
    }

    if (selectedCountry) {

        return (
            <div>
                {countryDetails(selectedCountry)}
            </div>
        )
    }
    
    if (searchCountry.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else if (searchCountry.length >= 2 && searchCountry.length <= 10) {
        return (
            <div>
                {searchCountry.map(result => <Fragment key={result.cca2}>
                    <p>{result.name.common} <button onClick={() => setSelectedCountry(result)}>show</button></p>
                </Fragment>)}
            </div>
        )
    } else {
        setSelectedCountry(searchCountry[0])

        return (
            <div>
                {searchCountry.map(result => <Fragment key={result.cca2}>
                    {countryDetails(result)}
                </Fragment>)}
            </div>
        )
    }
}

export default Countries