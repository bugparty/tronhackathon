import React from 'react';

function sortTokenBlock(props) {
    return (
        <div className="panel-block is-paddingless " >

        <div className="columns token">

            <div className="column is-5 has-text-centered">
            token name
            </div>
            <div className="column is-6  has-text-centered">
            user wallet amount
            </div>
            <div className="column is-3  has-text-centered">
            in eth gateway contract
            </div>
            <div className="column is-6  has-text-centered">
            in tron contract
            </div>

            </div>
        </div>
    )
}

export default sortTokenBlock;
