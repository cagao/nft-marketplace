import { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { useRouter } from "next/router";

import NFTContract from "../contracts/NFTContract";
import NFTMarketContract from "../contracts/NFTMarketContract";
import { PROVIDER_MODE } from "../contracts/BaseContract";

export default function MyAssets() {
  const router = useRouter();
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState("not-loaded");

  useEffect(() => {
    loadNfts();
  }, []);

  async function loadNfts() {
    const tokenContract = await NFTContract(PROVIDER_MODE.PRIVATE);
    const marketContract = await NFTMarketContract(PROVIDER_MODE.PRIVATE);

    const data = await marketContract.fetchMyNFTs();
    const items = await Promise.all(
      data.map(async (i) => {
        const tokenURI = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenURI);

        return {
          itemId: i.itemId.toNumber(),
          minter: i.minter,
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

  async function resellNft(itemId) {
    // resell the item
    let contract = await NFTMarketContract(PROVIDER_MODE.PRIVATE);
    let transaction = await contract.resellMarketItem(
      itemId
    );
    await transaction.wait();
    router.push("/");

  }

  if (loading === "loaded" && !nfts.length) {
    return <h1 className="px-20 py-10 text-3xl">No assets owned</h1>;
  }

  return (
    <div className="flex justify-center">
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts.map((nft, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <img
                src={nft.image}
                className="rounded"
                style={{ height: "200px", width: "100%" }}
                alt={`${nft.name} ${nft.description} ${nft.owner}`}
              />
              <div className="p-4 bg-black">
                <p className="text-2xl font-bold text-white">
                  Price - {nft.price} Eth
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
