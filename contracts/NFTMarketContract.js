import { contractNftMarketAddress } from "../config";
import BaseContract, { PROVIDER_MODE } from "./BaseContract";
import NFTMarket from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

export default async function NFTMarketContract(mode = PROVIDER_MODE.PUBLIC) {
  return await BaseContract(contractNftMarketAddress, NFTMarket.abi, mode);
}
