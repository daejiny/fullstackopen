import React from 'react'

const Persons = ({ personList, removePerson }) => (
    <div>
        {personList.map(person => <p key={person.name}>{person.name} {person.number} <button onClick={() => removePerson(person.id, person.name)}>Delete</button></p>)}
    </div>
)

export default Persons