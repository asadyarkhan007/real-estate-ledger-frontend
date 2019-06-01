var AdminPublicKey = "0x0A08a58433108f1a8dF080Ef552f137b2f7b8ce0";

var DeedContract= artifacts.require("./DeedContract.sol");
var leasedPropertyContract= artifacts.require("./LeasedpropertyContract.sol");
var leasedpropertyTaxContract= artifacts.require("./LeasedpropertyTaxContract.sol");
var mutationContract = artifacts.require("./MutationContract.sol");
var propertyContract= artifacts.require("./PropertyContract.sol");


module.exports = function(deployer) {
  deployer.deploy(DeedContract);
  deployer.deploy(leasedPropertyContract);
  deployer.deploy(leasedpropertyTaxContract);
  deployer.deploy(mutationContract);
  deployer.deploy(propertyContract);
};
