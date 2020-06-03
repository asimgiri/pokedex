import React from 'react';
import './App.css';
import PokemonList from './components/PokemonList';


function App() {
  return (
    <div className="App">
      <div className="main">
        <div className="logo">
          <div className="center"></div>
        </div>
        <PokemonList />
      </div>
    </div>
  );
}

export default App;
