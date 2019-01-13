import React from 'react';
import InputField from './InputField';

function BuyToken(props) {
    return (
        <div className="panel-block is-paddingless is-12">
            <div className="column is-12" id="token-lists">

                <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                           fields={props.fields} name="amount" placeholder="Amount To Buy" addon={"DAI"}/>



                <div className="field is-grouped is-pulled-right">
                    <p className="control">
                        <a className="button is-light" disabled={props.inProgress}
                           onClick={() => props.closeDeposit()}>
                            Back
                        </a>
                    </p>
                    <p className="control">
                        <a className={props.inProgress ? "button  is-loading" : "button is-danger"}
                           disabled={props.inProgress} onClick={() => props.BarCode()}>
                            Confirm
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default BuyToken;
