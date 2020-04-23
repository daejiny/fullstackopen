import React from 'react';

const Header = (props) => {
    let { course } = props;
    return (
        < header >
            <h1>{course.name}</h1>
        </header >
    )
}

export default Header;