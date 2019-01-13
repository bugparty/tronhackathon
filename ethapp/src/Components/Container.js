import React, { Component } from 'react';
import AddressBar from './AddressBar';
import TokenBlock from './TokenBlock';
import TradeMarkBlock from './TradeMarkBlock';
import SortTokenBlock from './SortTokenBlock';
import TransferToken from './TransferToken';
import TransferHeader from './TransferHeader';
import SuccessTransaction from './SuccessTransaction';
import DepositToken from './DepositToken';
import MapTron from './MapTron';
import MapTronHeader from './MapTronHeader';
class Container extends Component {
  render(){
      return (
         <section className="container">
             <div className="columns">
                <div className=" column">
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
                         this.props.mapTronDetail.hasOwnProperty('name') ?
                     <div>
                     <MapTronHeader token={this.props.mapTronDetail} />
                     <MapTron closeMapTron={this.props.closeMapTron}
                         mapTronDetail={this.props.mapTronDetail}
                         fields={this.props.fields}
                         account={this.props.account}
                         MapTron={this.props.MapTron}
                         inProgress={this.props.inProgress}
                         defaultGasPrice={this.props.defaultGasPrice}
                         defaultGasLimit={this.props.defaultGasLimit}
                         onInputChangeUpdateField={this.props.onInputChangeUpdateField}/>
                     </div> :

                         <div className={this.props.tx ? 'is-hidden' : ''}>
                             <SortTokenBlock />
                             <TokenBlock newTransfer={this.props.newTransfer} tokens={this.props.tokens}
                             newDeposit={this.props.newDeposit}  newMapTron={this.props.newMapTron}/>
                         </div>
                     }

                     <TradeMarkBlock tx={this.props.tx}/>
                     </div>
                 </div>
             </div>
         </section>
         )
     }
 }

export default Container;
