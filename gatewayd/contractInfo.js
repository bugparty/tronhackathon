var ethGatewayInfo = require('../ethapp/src/contractRes/TokenGateway.json')
var tronDaiInfo = require('../tronapp/src/contractRes/DaiToken.json')

var gateway = {
    'address': ethGatewayInfo.networks['5777'].address,
    'abi': ethGatewayInfo.abi
}

var tronDai = {
    'address': tronDaiInfo.networks['*'].address,
    'abi': tronDaiInfo.abi
}

module.exports.gateway = gateway;
module.exports.tronDai = tronDai;
