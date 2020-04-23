import React from 'react';
import Part from './Part';

const Content = (props) => {
    let { course } = props;
    let { parts } = course;
    let [ part1, part2, part3 ] = parts;
    return (
        <div>
            <Part part={part1.name} exercises={part1.exercises} />
            <Part part={part2.name} exercises={part2.exercises} />
            <Part part={part3.name} exercises={part3.exercises} />
        </div>
    )
}

export default Content;