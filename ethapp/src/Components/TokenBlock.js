import React from 'react';

class tokenBlock extends React.Component {
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
                                        {token.balance / 10.0 ** 5}
                                    </div>
                                    <div className="column is-2  is-ellipsis">
                                    {token.contractBalance / 10.0 ** 5}
                                    </div>
                                    <div className="column is-2  is-ellipsis">
                                    {token.contractFreezed / 10.0 ** 5}
                                    </div>
                                    <div className="column is-1 has-text-centered">
                                        <button onClick={() => this.props.newDeposit(index) } className="button is-outlined is-small ">
                                        Deposit
                                        </button>
                                    </div>
                                    <div className="column is-1 has-text-centered">
                                        <button onClick={() => this.props.newTransfer(index) } className="button is-outlined is-small is-danger">
                                            Withdraw
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

export default tokenBlock;
