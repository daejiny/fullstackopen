import React from 'react'

const Filter = ({ filter, setFilter }) => (
        <p>filter shown with <input value={filter} onChange={(e) => setFilter(e.target.value)} /></p>
)

export default Filter