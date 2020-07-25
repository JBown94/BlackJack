import React from 'react';
import logo from './logo.svg';
import './App.css';

// {/* <img src={logo} className="App-logo" alt="logo" /> */}

function App() {
  return (
    <div>
      <h1>Black Jack Board</h1>
      <hr />
      <Board />
    </div>
  );
}

export default App;

//-------------------------------------------------------------------
//TOOD: Create a separate file for this class

class Board extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
      return (
        <h1>The Board Data</h1>
      );
  }
}