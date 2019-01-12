var MyContract = artifacts.require("./DaiToken.sol");

module.exports = function(deployer) {
  deployer.deploy(MyContract);
};
