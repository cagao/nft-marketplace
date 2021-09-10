export const network = process.env.NEXT_PUBLIC_NETWORK;
export const infuraProjectId = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;
export const contractNftAddress = process.env.NEXT_PUBLIC_CONTRACT_NFT_ADDRESS;
export const contractNftMarketAddress =
  process.env.NEXT_PUBLIC_CONTRACT_NFT_MARKET_ADDRESS;

const config = {
  network,
  infuraProjectId,
  contractNftAddress,
  contractNftMarketAddress,
};

export default config;
