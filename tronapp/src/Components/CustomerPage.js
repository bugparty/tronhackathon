import React from 'react';
import SuccessTransaction from "./SuccessTransaction";
import AddressBar from "./AddressBar";
import TransferHeader from "./TransferHeader";
import TransferToken from "./TransferToken";
import DepositToken from "./DepositToken";
import SortTokenBlock from "./SortTokenBlock";
import TokenBlock from "./TokenBlock";
import TradeMarkBlock from "./TradeMarkBlock";
import BuyToken  from "./BuyToken";
import BarCode from "./BarCode";
class CustomerPage extends React.Component {
    render() {
        return (
            <div className="is-half is-offset-one-quarter column">
            <div className="panel">



    <AddressBar {...this.props}/>
        {
            !this.props.buy.begin ? <BuyToken {...this.props}/> :
        <BarCode {...this.props}/>
            }
        </div>
        </div>
        )
    }
        }


export default CustomerPage;
