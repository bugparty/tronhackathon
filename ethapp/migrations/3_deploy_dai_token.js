var DaiToken = artifacts.require("DaiToken");

module.exports = function(deployer) {
  deployer.deploy(DaiToken);
};
