# NFT MarketPlace

## Run in local

- init: `yarn install` or `npm install`
- start local blockchain: `npx hardhat node`
- deploy contracts: `npx hardhat run scripts/deploy.js --network localhost`
- config env config: copy nft address and nftmarket address to .env file

## Config

```
# Env about
NEXT_PUBLIC_NETWORK=hardhat
NEXT_PUBLIC_INFURA_PROJECT_ID=
ETHEREUM_ACCOUNT_PRIVATE_KEY=

# Contract about
NEXT_PUBLIC_CONTRACT_NFT_ADDRESS=
NEXT_PUBLIC_CONTRACT_NFT_MARKET_ADDRESS=
```

And You can use my contracts:

```
NEXT_PUBLIC_NETWORK=rinkeby
NEXT_PUBLIC_INFURA_PROJECT_ID=
ETHEREUM_ACCOUNT_PRIVATE_KEY=
NEXT_PUBLIC_CONTRACT_NFT_ADDRESS=0x9dF1376e760722A7a00ea247786b69351e309Ada
NEXT_PUBLIC_CONTRACT_NFT_MARKET_ADDRESS=0xc99f2B63D16e39F758dAd9E66C530784e14F5D47
```

### run the nextjs

- `yarn run dev` or `npm run dev`

## Hardhat About

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

## Website

- [Infura](https://infura.io)
- [Polygon](https://polygon.technology)
- [Matic Developer](https://docs.matic.network/docs/develop/getting-started)

## Thanks

Nader Dabit - How to Build a Full Stack NFT Marketplace on Ethereum with Polygon and Next.js

- [Github](https://github.com/dabit3/polygon-ethereum-nextjs-marketplace)
- [YouTube](https://www.youtube.com/watch?v=GKJBEEXUha0)
- [Article](https://dev.to/dabit3/building-scalable-full-stack-apps-on-ethereum-with-polygon-2cfb)
