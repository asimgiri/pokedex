import React from 'react';

export default function Search(props) {
    return (
        <div className="search">
            <input
                type="search"
                placeholder="Search Pokemon..."
                onChange={props.filterFn}
                value={props.value}
            />
        </div>
    )
}