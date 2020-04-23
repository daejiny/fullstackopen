import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
    const [weather, setWeather] = useState()
    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
            .then(response => {
                setWeather(response.data)
            })
    }, [country.capital])

    if (weather === undefined) {
        return <p>loading weather</p>
    }

    const { temperature, wind_speed, wind_dir, weather_icons, weather_descriptions } = weather.current

    return (
        <div>
            <p><strong>temperature:</strong> {temperature} Celsius</p>
            <p><strong>wind:</strong> {wind_speed} kph direction {wind_dir}</p>
            <img src={weather_icons[0]} alt={weather_descriptions[0]} style={{ maxHeight: '50px' }} />
        </div>
    )
}

export default Weather