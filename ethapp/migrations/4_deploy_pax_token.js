var PaxToken = artifacts.require("PaxToken");

module.exports = function(deployer) {
  deployer.deploy(PaxToken);
};
