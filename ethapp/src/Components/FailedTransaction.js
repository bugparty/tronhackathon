import React from 'react';

function FailedTransaction(props) {
    return (
        <div className="column is-12 is-ellipsis has-text-centered">
            <div className="notification is-info">
                <button className="delete"></button>
                <a title={props.title} className="is-size-7">{props.message}</a>
            </div>
        </div>
    )
}

export default SuccessTransaction;
