import React from 'react'

const userInput = (props) => {
    return (
        <div className="userIput">
            <input type="text" onChange={props.changed} value={props.name}/>
        </div>
    );

}


export default userInput