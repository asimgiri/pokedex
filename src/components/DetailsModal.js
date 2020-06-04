import React from 'react';

export default function DetailsModal(props) {
    return (

        <>
            <div>
                <h1><span>#{props.statID}</span> {props.statName}</h1>
            </div>

            <div className="inside">
                <div>
                    <img src={props.statImg} alt="" width="150px" />
                    <ul className="types">

                        {/* mapping the type array to display the types */}

                        {props.statType.map((value, index) => {
                            return (
                                <li key={index} name={value.type.name}>{value.type.name}</li>
                            )
                        })}



                    </ul>

                    <ul className="stats">
                        <li>HP</li>
                        <li className="bar"><span style={{ width: `${props.statHP}px` }}>{props.statHP}</span></li>
                        <li>Attack</li>
                        <li className="bar"><span style={{ width: `${props.statAttack}px` }}>{props.statAttack}</span></li>
                        <li>Defense</li>
                        <li className="bar"><span style={{ width: `${props.statDefense}px` }}>{props.statDefense}</span></li>
                        <li>Speed</li>
                        <li className="bar"><span style={{ width: `${props.statSpeed}px` }}>{props.statSpeed}</span></li>
                    </ul>
                </div>


                <div>
                    <ul className="profile">
                        <li className="banner">Profile</li>
                        <li>Height : <p>{props.profileHeight / 10} m</p></li>
                        <li>Weight : <p>{props.profileWeight / 10} kg</p></li>
                        <li>Base Experience : <p>{props.profileBase}</p></li>
                        <li>Abilities : {props.profileAbility.map((value, index) => {
                            return (
                                <p key={index}>{value.ability.name + ", "}</p>
                            )
                        })}</li>
                    </ul>
                </div>
            </div>
        </>


    )
}