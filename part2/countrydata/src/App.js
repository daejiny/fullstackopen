import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import axios from 'axios'
import Countries from './Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countryFilter = (newFilter.length === 0)
    ? countries
    : countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Countries</h2>
      <Filter filter={newFilter} setFilter={setNewFilter} />
      <Countries countryList={countryFilter} setFilter={setNewFilter} />
    </div>
  )
}

export default App