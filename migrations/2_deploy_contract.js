const NFT = artifacts.require("NFT");
const NFTMarket = artifacts.require("NFTMarket");
const fs = require('fs')

module.exports = async function(deployer) {
  await deployer.deploy(NFTMarket);
  const nftMarket = await NFTMarket.deployed();
  console.log("NFTMarket deployed to:", nftMarket.address);

  await deployer.deploy(NFT, nftMarket.address);
  const nft = await NFT.deployed();

  console.log("NFT deployed to:", nft.address);

  var content = "NEXT_PUBLIC_CONTRACT_NFT_MARKET_ADDRESS='";
  content += nftMarket.address;
  content += "'\n";

  content += "NEXT_PUBLIC_CONTRACT_NFT_ADDRESS='";
  content += nft.address;
  content +="'\n";

  fs.writeFileSync('.env', content, err => {
    if (err) {
      console.error(err);
    }
  });
};
