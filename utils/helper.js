import { ethers } from "ethers";
import { network, infuraProjectId } from "../config";

export const provider =
  network === "hardhat"
    ? new ethers.providers.JsonRpcProvider()
    : new ethers.providers.InfuraProvider("rinkeby", infuraProjectId);
