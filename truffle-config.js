module.exports = {
    contracts_build_directory: './contracts',
  
    networks: {
      development: {
        host: "127.0.0.1",     // Localhost (default: none)
        port: 8545,            // Standard Ethereum port (default: none)
        network_id: "*",       // Any network (default: none)
      },
      quorum: {
        url: 'http://localhost:22000',
        accounts: [
          '0x1be3b50b31734be48452c29d714941ba165ef0cbf3ccea8ca16c45e3d8d45fb0',
          '0x9bdd6a2e7cc1ca4a4019029df3834d2633ea6e14034d6dcc3b944396fe13a08b',
          '0x722f11686b2277dcbd72713d8a3c81c666b585c337d47f503c3c1f3c17cf001d',
          '0x6af685c4de99d44c620ccd9464d19bdeb62a750b9ae49b1740fb28d68a0e5c7d',
          '0x103bb5d20384b9af9f693d4287822fef6da7d79cb2317ed815f0081c7ea8d17d',
          '0x79999aef8d5197446b6051df47f01fd4d6dd1997aec3f5282e77ea27b6727346',
          '0xe85dae073b504871ffd7946bf5f45e6fa8dc09eb1536a48c4b6822332008973d',
        ],
      },
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
  