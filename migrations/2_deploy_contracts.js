var WalletContract = artifacts.require("WalletContract");
var PaxContract = artifacts.require("PaxTokenERC20");
module.exports = function(deployer) {
  deployer.deploy(PaxContract, 10000, 'PAX TOKEN', "PAX");
  deployer.deploy(WalletContract);
};