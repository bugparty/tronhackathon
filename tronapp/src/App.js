import React, { Component } from 'react';
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import Tokens from './Tokens/all';
import Nav from './Components/Nav';
import Description from './Components/Description';
import Container from './Components/Container';
import InstallMetamask from './Components/InstallMetamask';
import UnlockMetamask from './Components/UnlockMetamask';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//import TokenGateway from './contractRes/TokenGateway.json';
//import {EthGateway} from './Contracts/all'

import logo from './logo.svg';
let EthGateway = {};
class App extends Component {
  constructor(){
      super();

      this.tokens = Tokens;  //list of supported tokens by token-zendr contract
      this.appName = 'Tron Payment Panel';
      this.isWeb3 = true; //If metamask is installed
      this.isWeb3Locked = false; //If metamask account is locked

      //bind this methods to enable them change state from children components
      this.newTransfer = this.newTransfer.bind(this);
      this.closeTransfer = this.closeTransfer.bind(this);
      this.onInputChangeUpdateField = this.onInputChangeUpdateField.bind(this);

      this.state = {
          tronWeb: {
              installed: false,
              loggedIn: false
          },
          buy: {
              begin: false,
              amount: 0
          },
          tab : 1,
          tzAddress: null,          //address of the token-zendr contract
          inProgress: false,        //if a transfer action is in progress
          tx: null,                 //tx returned after a successfull transaction
          network: 'Checking...',   //default message to show while detecting network
          account: null,            //address of the currently unlocked metamask
          tokens: [],               //list of supported tokens owned by the user address
          transferDetail: {},
          depositDetail: {},
          fields: {                 //form fields to be submitted for a transfer to be initiated
              receiver: null,
              amount: null,
              gasPrice: null,
              gasLimit: null,
         },
         defaultGasPrice: null,
         defaultGasLimit: 200000
      };

      let web3 = window.tronWeb;
      this.web3 = web3;
      //set web3 & truffle contract
      if (typeof web3 !== 'undefined') {
          // // Use Mist/MetaMask's provider
          // this.web3Provider = web3.currentProvider;
          // this.web3 = new Web3(web3.currentProvider);
          //
          // // this.tokenGateway = TruffleContract(TokenGateway);
          // // this.tokenGateway.setProvider(this.web3Provider);
          // this.web3.eth.getCoinbase().then(coinbase => {
          //     if(coinbase === null) this.isWeb3Locked = true;
          // })


     }else{
      this.isWeb3 = false;
     }
 }

  //switch statement to check the current network and set the
  //value to be displayed on the nav component
  setNetwork = () => {
      let networkName,that = this;
      let a;
      (async () => {

          a = await this.web3.trx.getChainParameters();

          // this.web3.eth.net.getId().then((networkId) => {
          //     switch (networkId) {
          //         case "1":
          //             networkName = "Main";
          //             break;
          //         case "2":
          //             networkName = "Morden";
          //             break;
          //         case "3":
          //             networkName = "Ropsten";
          //             break;
          //         case "4":
          //             networkName = "Rinkeby";
          //             break;
          //         case "42":
          //             networkName = "Kovan";
          //             break;
          //         default:
          //             networkName = networkId;
          //     }
          //     that.setState({
          //         network: networkName
          //     })
          // });

      })();
      that.setState({
          network: 'localrpc'
      })


 };

 //When a new transfer is initiated
 //set details of the token to be
 //transfered such as the address, symbol.. etc
  newTransfer = (index) => {
      this.setState({
      transferDetail: this.state.tokens[index]
     })
 };

//When a new transfer is initiated
//set details of the token to be
//transfered such as the address, symbol.. etc
newDeposit = (index) => {
    this.setState({
        depositDetail: this.state.tokens[index]
    })
};

  //Called at the end of a successful
  //transfer to cclear form fields & transferDetails
  closeTransfer = () => {
      this.setState({
          transferDetail: {},
          fields: {},
     })
 };

//Called at the end of a successful
//transfer to cclear form fields & transferDetails
closeDeposit = () => {
    this.setState({
        depositDetail: {},
        fields: {},
    })
};

  setGasPrice = () => {
     //  this.web3.eth.getGasPrice((err,price) => {
     //      price = this.web3.utils.fromWei(price,'gwei');
     //      price = new this.web3.utils.BN(price);
     //      if(!err) this.setState({defaultGasPrice: price.toNumber()})
     // });
      this.setState({defaultGasPrice: 1e5})
 };

  setContractAddress = ()=> {
     //  this.tokenGateway.deployed().then((instance) => {
     //  this.setState({tzAddress: instance.address});
     // });
 };

 //Reset app state
  resetApp = () => {
      this.setState({
          transferDetail: {},
          depositDetail: {},
          fields: {
              receiver: null,
              amount: null,
              gasPrice: null,
              gasLimit: null,
         },
         defaultGasPrice: null,
     })
  };

  Transfer = () => {
      //Set to true to allow some component disabled
      //and button loader to show transaction progress
      this.setState({
          inProgress: true
      });

      (async () => {
          let web3 = window.tronWeb;
          let token = Tokens[0];
          let erc20Token = await web3.contract(token.abi).at(token.address);
          let transaction = await erc20Token.transfer('TRfYZacEWLs3ZZ8DEFphQNHoodRDFmgh43', 1e5).send();

          this.setState({
              inProgress: false
          });
          alert('success')
      })();
  }
  Deposit = () => {
        //Set to true to allow some component disabled
        //and button loader to show transaction progress
        this.setState({
            inProgress: true
        });

        //Use the ABI of a token at a particular address to call its methods
        let contract = new this.web3.eth.Contract(this.state.depositDetail.abi,
            this.state.depositDetail.address);
        let transObj = {
            from: this.state.account,
            //gas: this.state.defaultGasLimit,
            //gasPrice: this.state.defaultGasPrice
        };
        let app = this;
        //Use the decimal places the token creator set to get actual amount of tokens to transfer
        let amount = this.state.fields.amount * Math.pow(10,this.state.depositDetail.decimal) ;
        let symbol = this.state.depositDetail.symbol;
        let receiver = EthGateway.address;

        //Approve the token-zendr contract to spend on your behalf
        contract.methods.approve(receiver , amount )
            .send(transObj).then(response => {
            app.tokenGateway.deployed().then((instance) => {
                    console.log('approved')
                    this.tokenGatewayInstance = instance;
                    this.watchEvents();

                    console.log('started deposit,', symbol, amount, transObj)
                    //Transfer the token to third party on user behalf
                    this.tokenGatewayInstance.deposit(symbol,  amount, transObj)
                        .then((response, err) => {

                            if (response) {
                                console.log(response);

                                app.resetApp();

                                app.setState({
                                    tx: response.tx,
                                    inProgress: false
                                });
                            } else {
                                console.log(err);
                            }
                        });
                }
            )



        } , console.log);
    };

    BarCode = () => {
        //Set to true to allow some component disabled
        //and button loader to show transaction progress


        this.setState({
            buy: {
                begin: true,
                amount:100
            }
        })

    };


    /**
 * @dev Just a console log to list all transfers
 */
 watchEvents() {
  let param = {from: this.state.account,to: this.state.fields.receiver,amount: this.state.fields.amount};
  console.log('gateway', this.tokenGatewayInstance)
     this.tokenGatewayInstance.TransferSuccessful(param, {
         fromBlock: 0,
         toBlock: 'latest'
     }).watch((error, event) => {
         console.log(event);
     })
 }

  onInputChangeUpdateField = (name,value) => {
      let fields = this.state.fields;

      fields[name] = value;

      this.setState({
          fields
      });
 };

  componentDidMount(){


      let web3 = window.tronWeb;
      let currentAddress= web3.defaultAddress.base58;


      let account = currentAddress;
      let app = this;

      this.setNetwork();
      this.setGasPrice();
      this.setContractAddress();

      this.setState({
          account
      });

      //Loop through list of allowed tokens
      //using the token ABI & contract address
      //call the balanceOf method to see if this
      //address carries the token, then list on UI
      Tokens.forEach( (token) => {
          console.log('token', token);

          (async()=> {

              let erc20Token = await web3.contract(token.abi).at(token.address);
              let transaction = await erc20Token.balanceOf(account).call();


              let decimal = token.decimal;
              let precision = '1e' + decimal;
              //let balance = response.c[0] / precision;
              let balance = web3.BigNumber(transaction).toNumber();
              let name = token.name;
              let symbol = token.symbol;
              let icon = token.icon;
              let abi = token.abi;
              let address = token.address;

              balance = balance >= 0 ? balance : 0;
              let tokens = app.state.tokens;
              let showZeroBalance = true;
              if(showZeroBalance || balance > 0) tokens.push({
                  decimal,
                  balance,
                  name,
                  symbol,
                  icon,
                  abi,
                  address,
              });

              app.setState({
                  tokens
              })



          })();




        });


  }

  render() {
      if(this.isWeb3) {
          if(this.isWeb3Locked) {
          return (
             <div>
                 <Nav appName={this.appName} network={this.state.network} />
                 <UnlockMetamask message="Unlock Your Metamask/Mist Wallet" />
             </div>
         )
         }else {
          return (
             <Router>
              <div>
                 <Nav appName={this.appName} network={this.state.network} />
                 <Description />
                 <Container onInputChangeUpdateField={this.onInputChangeUpdateField}
                              transferDetail={this.state.transferDetail}
                              depositDetail={this.state.depositDetail}
                              closeTransfer={this.closeTransfer}
                              closeDeposit={this.closeDeposit}
                              newTransfer={this.newTransfer}
                              newDeposit={this.newDeposit}
                              Transfer={this.Transfer}
                              Deposit={this.Deposit}
                              account={this.state.account}
                              defaultGasPrice={this.state.defaultGasPrice}
                              defaultGasLimit={this.state.defaultGasLimit}
                              tx={this.state.tx}
                              inProgress={this.state.inProgress}
                              fields={this.state.fields}
                              tokens={this.state.tokens}
                              buy={this.state.buy}
                              BarCode={this.BarCode}
                              tab={this.state.tab}/>
                  </div>
             </Router>
            )
        }
    }else{
         return(
            <InstallMetamask />
         )
        }
     }
 }

export default App;
