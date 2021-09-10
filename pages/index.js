import { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import NFTMarket from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import config, {
  contractNftAddress,
  contractNftMarketAddress,
} from "../config";

export default function Home() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState("not-loaded");

  useEffect(() => {
    loadNfts();
  }, []);

  async function loadNfts() {
    console.log(config);

    const provider = new ethers.providers.JsonRpcProvider();

    const tokenContract = new ethers.Contract(
      contractNftAddress,
      NFT.abi,
      provider
    );

    const marketContract = new ethers.Contract(
      contractNftMarketAddress,
      NFTMarket.abi,
      provider
    );

    const data = await marketContract.fetchMarketItems();
    const items = await Promise.all(
      data.map(async (i) => {
        const tokenURI = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenURI);

        return {
          owner: i.owner,
          seller: i.seller,

          name: meta.data.name,
          image: meta.data.image,
          description: meta.data.description,

          tokenId: i.tokenId.toNumber(),
          price: ethers.utils.formatUnits(i.price.toString(), "ether"),
        };
      })
    );

    setNfts(items);
    setLoading("loaded");
  }

  async function buyNft(nft) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractNftMarketAddress,
      NFTMarket.abi,
      signer
    );
    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.createMarketSale(
      contractNftAddress,
      nft.tokenId,
      { value: price }
    );
    await transaction.wait();
    loadNFTs();
  }

  if (loading === "loaded" && !nfts.length) {
    return <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>;
  }

  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: "1600px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts.map((nft, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <img src={nft.image} />
              <div className="p-4">
                <p
                  style={{ height: "64px" }}
                  className="text-2xl font-semibold"
                >
                  {nft.name}
                </p>
                <div style={{ height: "70px", overflow: "hidden" }}>
                  <p className="text-gray-400">{nft.description}</p>
                </div>
              </div>
              <div className="p-4 bg-black">
                <p className="text-2xl mb-4 font-bold text-white">
                  {nft.price} ETH
                </p>
                <button
                  className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded"
                  onClick={() => buyNft(nft)}
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
