import { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";

import { contractNftAddress, contractNftMarketAddress } from "../config";
import NFTContract from "../contracts/NFTContract";
import NFTMarketContract from "../contracts/NFTMarketContract";
import { PROVIDER_MODE } from "../contracts/BaseContract";

export default function Home() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState("not-loaded");

  useEffect(() => {
    loadNfts();
  }, []);

  async function loadNfts() {
    const tokenContract = await NFTContract();
    const marketContract = await NFTMarketContract();

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
    const contract = await NFTMarketContract(PROVIDER_MODE.PRIVATE);
    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.createMarketSale(
      contractNftAddress,
      nft.tokenId,
      { value: price }
    );
    await transaction.wait();
    loadNfts();
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
              <img src={nft.image} alt={`${nft.name} ${nft.description}`} />
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
