import React from 'react';
import SuccessTransaction from "./SuccessTransaction";
import AddressBar from "./AddressBar";
import TransferHeader from "./TransferHeader";
import TransferToken from "./TransferToken";
import DepositToken from "./DepositToken";
import SortTokenBlock from "./SortTokenBlock";
import TokenBlock from "./TokenBlock";
import TradeMarkBlock from "./TradeMarkBlock";

class AssertsPage extends React.Component {
    render() {
        return (
            <div className="is-half is-offset-one-quarter column">
            <div className="panel">
            {  this.props.tx ?
            <SuccessTransaction tx={this.props.tx} /> :
        ''
        }


    <AddressBar account={this.props.account} tx={this.props.tx}/>
        {
            this.props.transferDetail.hasOwnProperty('name') ?
        <div>
        <TransferHeader token={this.props.transferDetail} />
        <TransferToken closeTransfer={this.props.closeTransfer}
            transferDetail={this.props.transferDetail}
            fields={this.props.fields}
            account={this.props.account}
            Transfer={this.props.Transfer}
            Deposit={this.props.Deposit}
            inProgress={this.props.inProgress}
            defaultGasPrice={this.props.defaultGasPrice}
            defaultGasLimit={this.props.defaultGasLimit}
            onInputChangeUpdateField={this.props.onInputChangeUpdateField}/>
        </div> :
            this.props.depositDetail.hasOwnProperty('name') ?
        <div>
        <TransferHeader token={this.props.depositDetail} />
        <DepositToken closeDeposit={this.props.closeDeposit}
            transferDetail={this.props.depositDetail}
            fields={this.props.fields}
            account={this.props.account}
            Deposit={this.props.Deposit}
            inProgress={this.props.inProgress}
            defaultGasPrice={this.props.defaultGasPrice}
            defaultGasLimit={this.props.defaultGasLimit}
            onInputChangeUpdateField={this.props.onInputChangeUpdateField}/>
        </div> :

        <div className={this.props.tx ? 'is-hidden' : ''}>
            <SortTokenBlock />
            <TokenBlock newTransfer={this.props.newTransfer} tokens={this.props.tokens} newDeposit={this.props.newDeposit} />
        </div>
        }

    <TradeMarkBlock tx={this.props.tx}/>
        </div>
        </div>
        )
    }
}
export default AssertsPage;
