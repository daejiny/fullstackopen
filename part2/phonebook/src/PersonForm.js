import React from 'react'

const PersonForm = ({name, setName, number, setNumber, handleClick}) => (

    <form>
        <div>
            <p>name: <input value={name} onChange={(e) => setName(e.target.value)} /></p>
            <p>number: <input value={number} onChange={(e) => setNumber(e.target.value)} /></p>
        </div>
        <div>
            <button type="submit" onClick={handleClick}>add</button>
        </div>
    </form>
)

export default PersonForm