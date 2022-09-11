import React, { Component } from 'react';
import './App.css';

import Validation from './Validation/Validation'
import Char from './Char/Char'

class App extends Component {
  state = {
    userInput: ''
  }

  inputChangeHandler = (event) => {
    this.setState({userInput: event.target.value})
  }

  deleteCharHandler = (charIndex) => {
    const char = this.state.userInput.split('')

    char.splice(charIndex, 1)

    const updatedText = char.join('')
    this.setState({userInput: updatedText})
  }


  render() {
    let charList = this.state.userInput.split('').map((ch,index) => {
      return <Char 
                character={ch} 
                key={index}
                click={() => this.deleteCharHandler(index)} />
    });


    return(
      <div className="App">
        <input 
          type="text" 
          onChange={this.inputChangeHandler} 
          value={this.state.userInput}/>
        <p>{this.state.userInput}</p>
        <Validation lengthWord={this.state.userInput.length}/>
        {charList}
      </div>
    );
  }
}

export default App;
