import React from 'react';

const validation = (props) => {
    let textType = null;

    if(props.lengthWord > 5) {
        textType = (
            <p>Text long enough</p>
        )
    } else {
        textType = (
            <p>Text too short</p>
        )
    }

    return (
        <div>
            {textType}
        </div>
    );
}

export default validation;