var Contract = artifacts.require("BearCoin");

module.exports = function(deployer) {
  deployer.deploy(Contract);
};