import React from 'react'

const Total = ({ course }) => {
    let { parts } = course
    let total = parts.map(part => part.exercises).reduce((acc, i) => acc + i, 0)
    return (
        <p><strong>Number of exercises {total}</strong></p>
    )
}

export default Total