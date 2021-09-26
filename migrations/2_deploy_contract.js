const NFT = artifacts.require("NFT");
const NFTMarket = artifacts.require("NFTMarket");

module.exports = async function(deployer) {
  await deployer.deploy(NFTMarket, {gas: 3500000});
  const nftMarket = await NFTMarket.deployed();
  console.log("NFTMarket deployed to:", nftMarket.address);

  await deployer.deploy(NFT, nftMarket.address, {gas: 3500000});
  const nft = await NFT.deployed();

  console.log("NFT deployed to:", nft.address);
};
