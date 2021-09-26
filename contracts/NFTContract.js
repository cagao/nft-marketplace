import { contractNftAddress } from "../config";
import BaseContract, { PROVIDER_MODE } from "./BaseContract";
import NFT from "../artifacts/contracts/NFT.json";

export default async function NFTContract(mode = PROVIDER_MODE.PUBLIC) {
  return await BaseContract(contractNftAddress, NFT.abi, mode);
}
