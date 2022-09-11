import React, { Component } from 'react';
import UserOutput from './components/UserOutput/UserOutput'
import UserInput from './components/UserInput/UserInput'

import './global/style/app.css';

class App extends Component {
  state = {
    person: '',
    React: 'React',
    awnserReact: [
      {
        sayHi: '', 
        name:''
      } 
    ],
    word: ''
  }

  nameChangeHandler = (event) => {
    this.setState(
      {
        awnserReact: [
          {
            sayHi: 'Hi,',
            name: event.target.value
          }
        ]
      }
    )
  }

  resetAwnserHandler = () => {
    this.setState(
      {
        awnserReact: [
          {
            sayHi: '',
            name: ''
          }
        ]
      }
    )
  }

  render() {
    const style = {
       borderRadius: '5px',
       background: '#fff',
       border: '1px solid #666',
       padding: '10px 20px',
       color: '#666',
       cursor: 'pointer'
    };

    return (
      <div className="app">
        <div className="react-introduction">
          <UserOutput introduction="Hi, we don't  know  each other." />
          <UserOutput introduction="But, i believe that we will." />
          <UserOutput introduction="My name is" awnser={this.state.React}  />
          <UserOutput introduction="Tell me who are you?"  />
        </div>
        <div className="user-introduction">
          <label> Your name: 
            <UserInput 
              changed={this.nameChangeHandler} 
              awnser={this.state.awnserReact[0].name}/>
          </label>
          <UserOutput 
            introduction={this.state.awnserReact[0].sayHi} 
            awnser={this.state.awnserReact[0].name} />
          <button 
              className="reset"
              style={style}
              onClick={this.resetAwnserHandler.bind(this, '')}>RESET</button>
        </div>
      </div>
    );
  }
}

export default App;
