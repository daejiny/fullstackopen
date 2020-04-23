import React from 'react';
import Part from './Part';

const Content = ({ course }) => {
    let { parts } = course
    let partsArray = parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)
    return (
        <div>
            {partsArray}
        </div>
    )
}

export default Content;