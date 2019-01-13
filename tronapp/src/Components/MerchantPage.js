import React from 'react';
import SuccessTransaction from "./SuccessTransaction";
import AddressBar from "./AddressBar";
import TransferHeader from "./TransferHeader";
import TransferToken from "./TransferToken";
import DepositToken from "./DepositToken";
import SortTokenBlock from "./SortTokenBlock";
import PayRoleBlock from "./PayRoleBlock";
import TradeMarkBlock from "./TradeMarkBlock";
import BuyToken  from "./BuyToken";
import BarCode from "./BarCode";
class MerchantPage extends React.Component {
    render() {
        return (
            < div
        className = "is-half is-offset-one-quarter column" >
            < div
        className = "panel" >


            < AddressBar
        account = {this.props.account}
        tx = {this.props.tx}
        />


    <
        TradeMarkBlock
        tx = {this.props.tx}
        />
        <PayRoleBlock Transfer={this.props.Transfer} tokens={this.props.tokens} newDeposit={this.props.newDeposit} />
        < /div>
        < /div>
    )

    }
}


export default MerchantPage;
