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
    const [keyword, setKeyword] = useState("");


    useEffect(() => {
        setLoading(true);
        fetchData();
    }, [currentPageUrl])

    const fetchData = () => {
        fetch(currentPageUrl)
            .then(response => response.json())
            .then(data => {
                setLoading(false);

                setNextPageUrl(prev => data.next);

                setPrevPageUrl(prev => data.previous);

                setPokemon(prev => data.results.map(value => value.name));

                setPokeIndex(prev => data.results.map(value => value.url.split("/")[value.url.split("/").length - 2]))
            })
    }


    const fetchDetails = (e) => {
        // fetch(`https://pokeapi.co/api/v2/pokemon/${pokeIndex[]}`)
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data);
        //     })
        console.log(e.target.src)
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

    const onChangeHandler = (e) => {

        setKeyword(e.target.value);

    }

    const findMatch = () => {
        for (let i = 0; i < pokemon.length; i++) {
            if (pokemon[i].includes(keyword)) {
                console.log(pokemon[i]);

                return (
                    <li>
                        <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeIndex[i]}.png`}
                            alt="pokemon"
                        />
                        <p>{pokemon[i]}</p>
                        <p>{}</p>
                    </li>
                )

            }
        }
    }


    return (

        <div className="pokemon_list">
            <div className="search">
                <input type="search" value={keyword} onChange={onChangeHandler} placeholder="Search Pokemon..." />
            </div>

            {keyword ? (
                <ul>
                    {findMatch()}
                </ul>
            ) : (
                    <ul>
                        {pokemon.map((value, index) => {
                            return (
                                <li key={index} onClick={fetchDetails}>
                                    <img
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeIndex[index]}.png`}
                                        alt="pokemon"
                                    />
                                    <p>{value}</p>
                                </li>
                            )
                        })}
                    </ul>
                )}



            <Pagination
                gotoNextPage={nextPageUrl ? gotoNextPage : null}
                gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
            />

        </div>
    )
}