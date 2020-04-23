import React from 'react'
import Weather from './Weather'

const Country = ({ country }) => {
    let { name, capital, population, languages, flag } = country
    return (
        <div>
            <h2>{name}</h2>
            <p>Capital: {capital}</p>
            <p>Population: {population}</p>
            <h3>Languages</h3>
            <ul>
                {languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={flag} style={{ maxHeight: '200px' }} alt='flag' />
            <h3>Weather</h3>
            <Weather country={country} />
        </div>
    )
}

export default Country