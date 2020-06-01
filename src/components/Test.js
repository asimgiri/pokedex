import React, { useState } from 'react';

export default function Test() {
    const [pokemon, setPokemon] = useState([]);
    const [url, setURL] = useState([]);

    const fetchData = () => {
        fetch("https://pokeapi.co/api/v2/pokemon/")
            .then(response => response.json())
            .then(data => {

                setPokemon(prev => data.results.map(value => value.name))
                setURL(prev => data.results.map(value => value.url.split("/")[value.url.split("/").length - 2]))

            })
    }

    return (
        <div>
            <button onClick={fetchData}>Click</button>

            {pokemon.map((value, index) => {
                return (
                    <div>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${url[index]}.png`} alt="" />
                        <p>{value}</p>
                    </div>
                )
            })}


        </div>
    )
}