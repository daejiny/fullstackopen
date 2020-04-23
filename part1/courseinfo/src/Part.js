import React from 'react';

const Part = (props) => {
    let {part, exercises} = props;
    return (
        <>
            <p>
                {part} {exercises}
            </p>
        </>
    )
}

export default Part;