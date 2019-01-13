const web3 = require('web3');
const express = require('express');
const Tx = require('ethereumjs-tx');
const contractInfo = require('./contractInfo')
const bs58 = require('bs58');
const TronWeb = require('TronWeb');
const HttpProvider = TronWeb.providers.HttpProvider;
const app = express();


//Infura HttpProvider Endpoint
web3js = new web3(new web3.providers.HttpProvider("http://localhost:8545"));

var fs = require('fs');
var ethPrivateKey = fs.readFileSync(".secret").toString().trim();
var ethPrivateKey = Buffer.from(ethPrivateKey, 'hex')
const adminAddress = '0xd68EA6878797A1C8c838bf9392e03aC89a7ef4b4';
const tronAdminAddress_bs58 = 'TNam6ddEMpXowJKp1Dk6WekaBwErxNHQEM';
const tronAdminAddress = '0x' + bs58.decode(tronAdminAddress_bs58).toString('hex');


const fullNode = 'http://127.0.0.1:8090'
const solidityNode = 'http://127.0.0.1:8091'
const eventServer = 'http://127.0.0.1:8092'
const privateKey = fs.readFileSync(".tronsecret").toString().trim();

const tronWeb = new TronWeb(
    fullNode,
    solidityNode,
    eventServer,
    privateKey
);
app.get('/map/:address/:symbol/:amount/:tronAddress', function(req,res){
    console.log('param', req.params)

    const userAddress = req.params.address;


    //contract abi is the array that you can get from the ethereum wallet or etherscan

    //creating contract object
    var ethContract = new web3js.eth.Contract(contractInfo.gateway.abi,contractInfo.gateway.address);
   // var tronContract = new web3tron.eth.Contract(contractInfo.tronDai.abi, contractInfo.tronDai.address);
    var count;
    const symbol = web3js.utils.utf8ToHex(req.params.symbol)
    // get transaction count, later will used as nonce
    web3js.eth.getTransactionCount(adminAddress).then(function(v){
        console.log("Count: "+v);
        count = v;
        //creating raw tranaction
        var rawTransaction = {"from":adminAddress,
            "gasPrice":web3js.utils.toHex(20* 1e9),
            "gasLimit":web3js.utils.toHex(210000),
            "to":contractInfo.gateway.address,"value":"0x0",
            "data":ethContract.methods.freezeToken(req.params.address, symbol, req.params.amount).encodeABI(),
            "nonce":web3js.utils.toHex(count)}

        console.log(rawTransaction);
        //creating tranaction via ethereumjs-tx
        var transaction = new Tx(rawTransaction);
        //signing transaction with private key
        transaction.sign(ethPrivateKey);
        //sending transacton via web3js module

        web3js.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'))
            .on('transactionHash', tx => console.log('tx:', tx))
            .on('receipt', receipt => {
                ethContract.methods.balanceOfFreezed(req.params.address, symbol).call()
                    .then(function(balance){
                        console.log('freezed', balance)
                    });
                (async () => {
                    try {
                        let abi = contractInfo.tronDai.abi;

                        let contract = await tronWeb.contract(abi=abi).at(contractInfo.tronDai.address);
                        let param = {
                            feeLimit: 1000000000,
                            callValue: 0,
                            shouldPollResponse: true
                        };
                        let receipt = await contract.mint(req.params.tronAddress, req.params.amount).send({shouldPollResponse:true})

                        res.json({ status: receipt});

                        console.log('result: ', receipt);
                    } catch(e){
                        console.error(e);
                    }

                    console.log('complement.');
                })();
                // tronWeb.eth.getTransactionCount(tronAdminAddress).then(function(v){
                //     const count = v;
                //     console.log("Tron Count: "+v);
                //     var rawTransaction = {"from":tronAdminAddress,
                //         "gasPrice":web3js.utils.toHex(20* 1e9),
                //         "gasLimit":web3js.utils.toHex(210000),
                //         "to":contractInfo.tronDai.address,"value":"0x0",
                //         "data":ethContract.methods.mint(userAddress, req.params.amount).encodeABI(),
                //         "nonce":web3js.utils.toHex(count)}
                //     console.log(rawTransaction);
                //     //creating tranaction via ethereumjs-tx
                //     var transaction = new Tx(rawTransaction);
                //     //signing transaction with private key
                //     transaction.sign(tronPrivateKey);
                //     web3tron.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'))
                //         .on('transactionHash', tx => console.log('tx:', tx))
                //         .on('receipt', receipt => {
                //             res.json({ status: receipt.status });
                //         });
                // });

                });
            });


});
app.listen(3001, () => console.log('Gatewayd listening on port 3001!'))
