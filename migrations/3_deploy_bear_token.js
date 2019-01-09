var Contract = artifacts.require("BearToken");
var CubContract = artifacts.require("CubToken");

module.exports = function(deployer) {
  deployer.deploy(Contract);
  deployer.deploy(CubContract);
};