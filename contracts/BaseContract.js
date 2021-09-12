import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { network, infuraProjectId } from "../config";

export const PROVIDER_MODE = {
  PUBLIC: "PUBLIC",
  PRIVATE: "PRIVATE",
};

export default async function BaseContract(address, abi, mode = "") {
  let provider = null;

  if (mode === PROVIDER_MODE.PRIVATE) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    provider = new ethers.providers.Web3Provider(connection).getSigner();
  }

  if (mode === PROVIDER_MODE.PUBLIC) {
    provider =
      network === "hardhat"
        ? new ethers.providers.JsonRpcProvider()
        : new ethers.providers.InfuraProvider("rinkeby", infuraProjectId);
  }

  if (!provider) {
    throw new Error("Please set the provider mode");
  }

  return new ethers.Contract(address, abi, provider);
}
