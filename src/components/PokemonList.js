import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';
import Loading from './Loading';

export default function PokemonList() {
    const [pokemon, setPokemon] = useState([]);
    const [pokeIndex, setPokeIndex] = useState([]);
    const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=24");
    const [nextPageUrl, setNextPageUrl] = useState();
    const [prevPageUrl, setPrevPageUrl] = useState();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        fetchData();
    }, [currentPageUrl])

    const fetchData = () => {
        fetch(currentPageUrl)
            .then(response => response.json())
            .then(data => {
                setLoading(false);

                console.log(data);

                setNextPageUrl(prev => data.next);

                setPrevPageUrl(prev => data.previous);

                setPokemon(prev => data.results.map(value => value.name));

                setPokeIndex(prev => data.results.map(value => value.url.split("/")[value.url.split("/").length - 2]))

            })
    }

    const gotoNextPage = () => {
        setCurrentPageUrl(nextPageUrl);
    }

    const gotoPrevPage = () => {
        setCurrentPageUrl(prevPageUrl);
    }

    if (loading) {
        return (
            <Loading />
        )
    }

        

    return (
        <>
            <div className="search">
                <input type="text"/>
            </div>
            <div className="pokemon_list">
                <ul>
                    {pokemon.map((value, index) => {
                        return (
                            <li key={index}>
                                <img
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeIndex[index]}.png`}
                                    alt="pokemon"
                                />
                                <p>{value}</p>
                            </li>
                        )
                    })}
                </ul>

                <Pagination
                    gotoNextPage={nextPageUrl ? gotoNextPage : null}
                    gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
                />

            </div>
        </>
    )
}