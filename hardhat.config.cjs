require("@nomiclabs/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.21",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545", // Ganache RPC URL
      accounts: [
        "0xd4c42913f75ff08ad6b109102e0b4657aeaa42927dc5ca2c48a7694025d1ca6a", // Replace with actual private key from Ganache
        "0xa73ca2bebed25b0a193983713ec7e5763ac459dca12f875d97d7802bd148a13f"  // Replace with actual private key from Ganache
      ]
    }
  }
};
