import React from 'react';

export default function Card(props) {
    return (
        <li className="bob-on-hover" data-index={props.dataIndex} onClick={props.onClick}>
            <img
                data-index={props.dataIndex}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.dataIndex}.png`}
                alt="pokemon"
            />
            <p>#{props.dataIndex}</p>
            <h2>{props.name}</h2>
        </li>
    )
}