const NFT = artifacts.require("./NFT.sol")
const NFTMarket = artifacts.require("./NFTMarket.sol")

const fs = require('fs')

require('web3')

contract("NFTMarket", async (accounts) => {
  it("Should create and execute market sales", async function () {
    const market = await NFTMarket.deployed();
    const marketAddress = market.address;

    const nft = await NFT.deployed(marketAddress);
    const nftContractAddress = nft.address;

    let listingPrice = await market.getListingPrice();
    listingPrice = listingPrice.toString();

    // const auctionPrice = ethers.utils.parseUnits("1", "ether");
    const auctionPrice = web3.utils.toWei("1", 'ether')

    await nft.createToken("nft.marketplace");
    await nft.createToken("marketplace.nft");

    await market.createMarketItem(nftContractAddress, 1, auctionPrice, {
      value: listingPrice,
    });
    await market.createMarketItem(nftContractAddress, 2, auctionPrice, {
      value: listingPrice,
    });

    let availableCount = await market.getAvailableCount();
    console.log("availableCount: ", availableCount.toNumber());
    await market.createMarketSale(nftContractAddress, 1, { value: auctionPrice, from: accounts[1] });

    availableCount = await market.getAvailableCount();
    console.log("availableCount after sale: ", availableCount.toNumber());
    let items = await market.fetchMarketItems();
  
    
    console.log("items: ", items);
  


    await market.createMarketResale(1, {from: accounts[1]});

    items = await market.fetchMarketItems();
  
    console.log("items again: ", items);
  
  
    items = await Promise.all(
      items.map(async (i) => {
        console.log("i:", i);
        const tokenURI = await nft.tokenURI(i.tokenId);
        let item = {
          price: i.price.toString(),
          tokenId: i.tokenId.toString(),
          seller: i.seller,
          owner: i.owner,
          tokenURI,
        };
      })
    );

    console.log("items third times: ", items);
  });
});
