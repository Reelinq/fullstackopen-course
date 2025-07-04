import { useState, useEffect } from 'react'
import axios from 'axios'
import images from './../assets/weather_icons/images'

const apiKey = import.meta.env.VITE_API_KEY

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState({
    temperature: null,
    wind: null,
    icon: null
  })

  useEffect(() => {
    axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${capital}?unitGroup=metric&key=${apiKey}&include=current`)
      .then(response => {
          setWeather({
            temperature: response.data.currentConditions.temp,
            wind: response.data.currentConditions.windspeed,
            icon: response.data.currentConditions.icon
          })
      })
  }, [capital])

  /*Checking for random item inside object (not nessesarly .icon) :)*/
  if (!weather.icon) {
    return (
      <div>
        <h3>Weather in {capital}</h3>
        <p>Loadnig..</p>
      </div>
    )
  }

  const weatherImage = images.find(item => item.name === weather.icon)

  console.log(weatherImage)

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>Temperature {weather.temperature} Celsius</p>
      <img src={weatherImage.image} alt={weatherImage.name} />
      <p>Wind {weather.wind} m/s</p>
    </div>
  )
}

export default Weather
