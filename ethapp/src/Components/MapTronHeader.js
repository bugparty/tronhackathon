import React from 'react';

function MapTronHeader(props) {
    return (
        <div className="panel-block">
            <div className="content">
                <h1 className="title is-size-5 is-uppercase">Map {props.token.symbol} to Tron</h1>
                <h2 className="subtitle is-size-6  has-text-grey-light">
                    Only send {props.token.symbol.toUpperCase()} to an Tron address.
                </h2>
            </div>
        </div>
    )
}

export default MapTronHeader;
