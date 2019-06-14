const PatronageCollectibles = artifacts.require("PatronageCollectibles");

module.exports = function(deployer) {
  deployer.deploy(PatronageCollectibles);
};
