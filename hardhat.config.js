require("@nomiclabs/hardhat-waffle");
const env = require("dotenv").config().parsed;

const projectId = env.NEXT_PUBLIC_INFURA_PROJECT_ID;
const accountPrivateKey = env.ETHEREUM_ACCOUNT_PRIVATE_KEY;

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
      accounts: [accountPrivateKey],
    },
    mainnet: {
      url: `https://polygon-mainnet.infura.io/v3/${projectId}`,
      accounts: [accountPrivateKey],
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${projectId}`,
      accounts: [accountPrivateKey],
    },
  },
  solidity: "0.8.4",
};
