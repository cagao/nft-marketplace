import { useState } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";

import { upload } from "../utils/helper";
import { contractNftAddress } from "../config";
import { PROVIDER_MODE } from "../contracts/BaseContract";
import NFTContract from "../contracts/NFTContract";
import NFTMarketContract from "../contracts/NFTMarketContract";

const DefaultFormInput = {
  img: "",
  name: "",
  price: "",
  description: "",
};

export default function CreateItem() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formInput, updateFormInput] = useState({ ...DefaultFormInput });

  async function onChange(e) {
    upload(e.target.files[0])
      .then((e) => updateFormInput({ ...formInput, image: e.target.value }))
      .catch((e) => console.log("Error uploading file: ", e));
  }

  async function createMarket() {
    // Check data
    const { name, description, price, image } = formInput;
    if (loading) return;
    if (!name || !description || !price || !image) return;

    // Init data
    setLoading(true);
    const data = JSON.stringify({
      name,
      image,
      description,
    });

    // Create data
    upload(data)
      .then((e) => createSale(e.target.value))
      .catch((e) => console.log("Error uploading file: ", e))
      .finally(setLoading(false));
  }

  async function createSale(url) {
    // create the item
    let contract = await NFTContract(PROVIDER_MODE.PRIVATE);
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();

    const price = ethers.utils.parseUnits(formInput.price, "ether");

    // then list the item for sale on the marketplace
    contract = await NFTMarketContract(PROVIDER_MODE.PRIVATE);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    transaction = await contract.createMarketItem(
      contractNftAddress,
      tokenId,
      price,
      { value: listingPrice }
    );
    await transaction.wait();
    router.push("/");
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, name: e.target.value })
          }
        />

        <textarea
          placeholder="Asset Description"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, description: e.target.value })
          }
        />

        <input
          placeholder="Asset Price in Eth"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, price: e.target.value })
          }
        />

        <input type="file" name="Asset" className="my-4" onChange={onChange} />

        {formInput.image && (
          <img
            width="350"
            alt="new nft image"
            src={formInput.image}
            className="rounded mt-4"
          />
        )}

        <button
          disabled={!loading}
          onClick={createMarket}
          className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
        >
          Create Digital Asset
        </button>
      </div>
    </div>
  );
}
