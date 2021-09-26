module.exports = {
    contracts_build_directory: './artifacts/contracts',
  
    networks: {
      development: {
        host: "127.0.0.1",     // Localhost (default: none)
        port: 8545,            // Standard Ethereum port (default: none)
        network_id: "*",       // Any network (default: none)
      },
      quorum: {
        host: "127.0.0.1",
        port: 22000, // was
        network_id: "*", // Match any network id
        gasPrice: 0,
        gas: 4500000,
        type: "quorum", // needed for Truffle to support Quorum
      }
    },
  
    compilers: {
      solc: {
        version: "^0.8.4",
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    },
  
    // Set default mocha options here, use special reporters etc.
    mocha: {
      // timeout: 100000
    }
  };
  