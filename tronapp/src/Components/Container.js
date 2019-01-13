import React, { Component } from 'react';
import AddressBar from './AddressBar';
import TokenBlock from './TokenBlock';
import TradeMarkBlock from './TradeMarkBlock';
import SortTokenBlock from './SortTokenBlock';
import TransferToken from './TransferToken';
import TransferHeader from './TransferHeader';
import SuccessTransaction from './SuccessTransaction';
import DepositToken from './DepositToken';
import AssertsPage from './AssertsPage';
import CustomerPage from './CustomerPage';
import MerchantPage from './MerchantPage';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class Container extends Component {
  render(){
      return (
         <section className="container">
             <div className="columns">
          <Route
      path="/" exact
      render={ () => <AssertsPage {...this.props} />}

      />
      <Route
      path="/customer"
      render={ () => <CustomerPage {...this.props} />}

      />
      <Route
      path="/merchant"
      render={ () => <MerchantPage {...this.props} />}

      />
             </div>
         </section>
         )
     }
 }

export default Container;
