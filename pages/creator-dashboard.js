import axios from "axios";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { EMPTY_ADDRESS } from "../utils/helper";
import NFTContract from "../contracts/NFTContract";
import NFTMarketContract from "../contracts/NFTMarketContract";
import { PROVIDER_MODE } from "../contracts/BaseContract";

export default function CreatorDashboard() {
  const [nfts, setNfts] = useState([]);
  const [sold, setSold] = useState([]);
  const [loading, setLoading] = useState("not-loaded");

  useEffect(() => {
    loadNfts();
  }, []);

  async function loadNfts() {
    const tokenContract = await NFTContract(PROVIDER_MODE.PRIVATE);
    const marketContract = await NFTMarketContract(PROVIDER_MODE.PRIVATE);

    const data = await marketContract.fetchItemsCreated();
    const items = await Promise.all(
      data.map(async (i) => {
        const tokenURI = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenURI);

        return {
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

    const soldItems = items.filter((i) => i.owner !== EMPTY_ADDRESS);

    setNfts(items);
    setSold(soldItems);
    setLoading("loaded");
  }

  if (loading === "loaded" && !nfts.length) {
    return <h1 className="px-20 py-10 text-3xl">No creator owned</h1>;
  }

  return (
    <div>
      <div className="p-4">
        <h2 className="text-2xl py-2">Items Created</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts.map((nft, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <img
                src={nft.image}
                className="rounded"
                style={{ height: "200px", width: "100%" }}
                alt={`${nft.name} ${nft.description}`}
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
      <div className="px-4">
        {Boolean(sold.length) && (
          <div>
            <h2 className="text-2xl py-2">Items sold</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              {sold.map((nft, i) => (
                <div
                  key={i}
                  className="border shadow rounded-xl overflow-hidden"
                >
                  <img
                    src={nft.image}
                    className="rounded"
                    style={{ height: "200px", width: "100%" }}
                    alt={`${nft.name} ${nft.description}`}
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
        )}
      </div>
    </div>
  );
}
