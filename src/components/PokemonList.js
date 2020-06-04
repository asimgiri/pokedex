import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';
import Loading from './Loading';
import Modal from 'react-modal';
import Card from './Card';
import DetailsModal from './DetailsModal';
import Search from './Search';

Modal.setAppElement('#root');

export default function PokemonList() {
    const [pokemon, setPokemon] = useState([]);
    const [pokeIndex, setPokeIndex] = useState([]);
    const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=800");  // pokemon displayed can be adjusted
    const [nextPageUrl, setNextPageUrl] = useState();
    const [prevPageUrl, setPrevPageUrl] = useState();
    const [loading, setLoading] = useState(true);
    const [modalState, setModalState] = useState(false);
    const [stats, setStats] = useState({
        id: null,
        name: null,
        imgFront: null,
        type: [],
        hp: null,
        attack: null,
        defense: null,
        speed: null,
        spattack: null,
        spdefense: null,
    })
    const [profile, setProfile] = useState({
        height: null,
        weight: null,
        base: null,
        ability: [],
    })
    const [keyword, setKeyword] = useState('');


    useEffect(() => {
        setLoading(true);

        const fetchData = async () => {
            const response = await fetch(currentPageUrl);
            const data = await response.json();
            setLoading(false);

            console.log(data);

            setNextPageUrl(prev => data.next);

            setPrevPageUrl(prev => data.previous);

            setPokemon(prev => data.results.map(value => value.name));

            setPokeIndex(prev => data.results.map(value => value.url.split("/")[value.url.split("/").length - 2]))

        }

        fetchData();


    }, [currentPageUrl])


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


    const onClickHandler = async (e) => {

        // to get the index of pokemon selected(clicked)

        let k = parseInt(e.target.getAttribute("data-index"));

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${k}`);
        const data = await response.json();

        setLoading(false);

        setStats(prev => ({
            ...prev,
            id: data.id,
            name: data.name,
            imgFront: data.sprites.front_default,
            type: data.types,
            hp: data.stats[5].base_stat,
            speed: data.stats[0].base_stat,
            defense: data.stats[3].base_stat,
            attack: data.stats[4].base_stat,
        }))

        setProfile(prev => ({
            ...prev,
            height: data.height,
            weight: data.weight,
            base: data.base_experience,
            ability: data.abilities,     // copying the data.abilities array to ability
        }))

        setModalState(true);
    }


    const onClickSetKeyword = (e) => {
        setKeyword(e.target.value);
    }


    return (
        <div className="pokemon_list">

            <Search
                filterFn={onClickSetKeyword}
                value={keyword}
            />

            <ul>
                {pokemon.map((value, index) => {
                    {
                        return (

                            // filtering according to the keywords

                            // false && something is always false

                            pokemon[index].includes(keyword) &&

                            <Card
                                key={index}
                                dataIndex={pokeIndex[index]}
                                onClick={onClickHandler}
                                name={value}
                            />
                        )
                    }
                })}
            </ul>

            <Modal
                isOpen={modalState}
                onRequestClose={() => setModalState(false)}
                style={{ overlay: { backgroundColor: 'rgba(0,0,0,.8)' } }}
                id="modal"
            >

                <DetailsModal
                    statID={stats.id}
                    statName={stats.name}
                    statImg={stats.imgFront}
                    statType={stats.type}
                    statHP={stats.hp}
                    statAttack={stats.attack}
                    statDefense={stats.defense}
                    statSpeed={stats.speed}

                    profileHeight={profile.height}
                    profileWeight={profile.weight}
                    profileBase={profile.base}
                    profileAbility={profile.ability}
                />

            </Modal>

            {/* best to use when pokemon limit is less */}

            <Pagination
                gotoNextPage={nextPageUrl ? gotoNextPage : null}
                gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
            />

        </div>
    )
}