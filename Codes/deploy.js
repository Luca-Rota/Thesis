const registry = artifacts.require("DataCellarRegistry");
module.exports = async function (deployer, accounts) {
  try {
    await deployer.deploy(registry, accounts[0]); 
    const registryInstance = await registry.deployed();
    console.log("DataCellarRegistry contract deployed at:", registryInstance.address);
  } catch (error) {
    console.error("Error deploying the contract:", error);
  }
};