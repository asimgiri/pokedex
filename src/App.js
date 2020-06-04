import React from 'react';
import './App.css';
import PokemonList from './components/PokemonList';
import './assets/responsive.css'


function App() {
  return (
    <div className="App">
      <div className="main">
        <div className="logo">
          <div className="center"></div>
        </div>
        <h1 className="title">POKEDEX</h1>
        <PokemonList />
      </div>
    </div>
  );
}

export default App;
