import React from 'react'
import Country from './Country'

const Countries = ({ countryList, setFilter }) => {
    if (countryList.length === 1) return <Country country={countryList[0]} />
    if (countryList.length > 10) return <p>Too many matches, specify another filter</p>
    return (
        <div>
            {countryList.map(country => (
                <div key={country.alpha3Code}>
                    <p>{country.name} <button onClick={() => setFilter(country.name)}>Show</button></p>
                </div>
            ))}
        </div>
    )
}

export default Countries