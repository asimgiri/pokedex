import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';
import Loading from './Loading';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function PokemonList() {
    const [pokemon, setPokemon] = useState([]);
    const [pokeIndex, setPokeIndex] = useState([]);
    const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=24");
    const [nextPageUrl, setNextPageUrl] = useState();
    const [prevPageUrl, setPrevPageUrl] = useState();
    const [loading, setLoading] = useState(true);
    const [modalState, setModalState] = useState(false);
    const [stats, setStats] = useState({
        id: null,
        name: null,
        imgFront: null,
        type1: null,
        type2: null,
        hp: null,
        attack: null,
        defense: null,
        speed: null,
        spattack: null,
        spdefense: null,
    })


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


    const onClickHandler = (e) => {
        let k = parseInt(e.target.getAttribute("data-index"));

        console.log(k);

        fetch(`https://pokeapi.co/api/v2/pokemon/${k}`)
            .then(response => response.json())
            .then(data => {
                setLoading(false);
                console.log(data);

                setStats(prev => ({
                    ...prev,
                    id: data.id,
                    name: data.name,
                    imgFront: data.sprites.front_default,
                    type1: data.types[0].type.name,
                    // type2: data.types[1].type.name,
                    hp: data.stats[5].base_stat,
                    speed: data.stats[0].base_stat,
                    defense: data.stats[3].base_stat,
                    attack: data.stats[4].base_stat,
                }))

                setModalState(true);

            })
    }

    return (

        <div className="pokemon_list">
            <div className="search">
                <input type="search" placeholder="Search Pokemon..." />
            </div>
            <ul>
                {pokemon.map((value, index) => {
                    return (
                        <li key={index} data-index={pokeIndex[index]} onClick={onClickHandler}>
                            <img
                                data-index={pokeIndex[index]}
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeIndex[index]}.png`}
                                alt="pokemon"
                            />
                            <p>#{pokeIndex[index]}</p>
                            <h2>{value}</h2>
                        </li>
                    )
                })}
            </ul>

            <Modal
                isOpen={modalState}
                onRequestClose={() => setModalState(false)}
                style={{ overlay: { backgroundColor: 'rgba(0,0,0,.8)' } }}
                id="modal"
            >
                {/* <h2>{details.name}</h2>
                <p>Modal body</p>
                <button onClick={() => setModalState(false)}>Close</button> */}

                <div>
                    <h1><span>#{stats.id}</span> {stats.name}</h1>
                </div>

                <div className="inside">
                    <div>
                        <img src={stats.imgFront} alt="" width="150px" />
                        <ul className="types">
                            <li name={stats.type1}>{stats.type1}</li>
                            <li name={stats.type2}>{stats.type2}</li>
                        </ul>

                        <ul className="stats">
                            <li>HP</li>
                            <li className="bar"><span style={{ width: `${stats.hp}px` }}>{stats.hp}</span></li>
                            <li>Attack</li>
                            <li className="bar"><span style={{ width: `${stats.attack}px` }}>{stats.attack}</span></li>
                            <li>Defense</li>
                            <li className="bar"><span style={{ width: `${stats.defense}px` }}>{stats.defense}</span></li>
                            <li>Speed</li>
                            <li className="bar"><span style={{ width: `${stats.speed}px` }}>{stats.speed}</span></li>
                        </ul>
                    </div>
                    <div>
                    </div>
                </div>



            </Modal>



            <Pagination
                gotoNextPage={nextPageUrl ? gotoNextPage : null}
                gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
            />

        </div>
    )
}