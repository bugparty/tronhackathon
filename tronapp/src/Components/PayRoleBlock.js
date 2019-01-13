import React from 'react';

class PayRoleBlock extends React.Component {
    render() {
        return (
            <div className="panel-block is-paddingless " >
                <div className="column " id="token-lists">
                    {
                        this.props.tokens.map((token,index) => {
                            return (
                                <div key={index} className="columns token">
                                    <div className="column is-1 has-text-centered">
                                        <img alt={token.symbol} src={'icons/' + token.icon} className="token-icon"></img>
                                    </div>
                                    <div className="column is-2 is-ellipsis">
                                        {token.symbol}
                                    </div>
                                    <div className="column is-2  is-ellipsis">
                                        RMB 6 yuan
                                    </div>
                                <div className="column is-2  is-ellipsis">
                                    1 DAI
                                </div>
                                    <div className="column is-2  has-text-centered">
                                        <button onClick={() => this.props.newDeposit(index) } className="button is-outlined is-small ">
                                Reject
                                        </button>
                                    </div>
                                    <div className="column is-2  has-text-centered">
                                        <button onClick={() => this.props.Transfer() } className="button is-outlined is-small is-danger">
                                Confirm
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default PayRoleBlock;
