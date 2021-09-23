const { ethers } = require("hardhat");

const { ipfsTestClient } = require("ipfs-http-client");

describe("IPFSAddGet", function () {
  it("Should upload to ipfs successfully", async function () {
    const client = ipfsTestClient('http://localhost:5001/api/v0');
    const {added} = client.add('README.md', {
      progress: (prog) => console.log(`received: ${prog}`),
    });

    const url = `http://localhost:8080/ipfs/${added.path}`;
    console.log("success uploading file: ", url);
  });
});

describe("NFTMarket", function () {
  it("Should create and execute market sales", async function () {
    const Market = await ethers.getContractFactory("NFTMarket");
    const market = await Market.deploy();
    await market.deployed();
    const marketAddress = market.address;

    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(marketAddress);
    await nft.deployed();
    const nftContractAddress = nft.address;

    let listingPrice = await market.getListingPrice();
    listingPrice = listingPrice.toString();

    const auctionPrice = ethers.utils.parseUnits("1", "ether");

    await nft.createToken("nft.marketplace");
    await nft.createToken("marketplace.nft");

    await market.createMarketItem(nftContractAddress, 1, auctionPrice, {
      value: listingPrice,
    });
    await market.createMarketItem(nftContractAddress, 2, auctionPrice, {
      value: listingPrice,
    });

    const [_, buyerAddress] = await ethers.getSigners();

    await market
      .connect(buyerAddress)
      .createMarketSale(nftContractAddress, 1, { value: auctionPrice });

    items = await market.fetchMarketItems();

    items = await Promise.all(
      items.map(async (i) => {
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

    console.log("items: ", items);
  });
});
