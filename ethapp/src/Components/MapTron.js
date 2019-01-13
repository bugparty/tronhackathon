import React from 'react';
import InputField from './InputField';

function MapTron(props) {
    return (
        <div className="panel-block is-paddingless is-12">
            <div className="column is-12" id="token-lists">

                <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                           fields={props.fields} name="amount" placeholder="Amount To Map to Tron" addon={props.mapTronDetail.symbol.toUpperCase()}/>

                <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                fields={props.fields} name="tronAddress" placeholder="Tron address of your eth privatekey (due to metamask limition"/>


                <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            default={props.defaultGasPrice}
                            fields={props.fields} name="gasPrice" placeholder="Gas Price In Gwei" addon="Gas Price(gwei)"/>

                <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            default={props.defaultGasLimit}
                            fields={props.fields} name="gasLimit" placeholder="Gas Limit" addon="Gas Limit"/>

                <div className="field is-grouped is-pulled-right">
                    <p className="control">
                        <a className="button is-light" disabled={props.inProgress}
                           onClick={() => props.closeMapTron()}>
                            Back
                        </a>
                    </p>
                    <p className="control">
                        <a className={props.inProgress ? "button is-danger is-loading" : "button is-danger"}
                           disabled={props.inProgress} onClick={() => props.MapTron()}>
                            Transfer
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default MapTron;
