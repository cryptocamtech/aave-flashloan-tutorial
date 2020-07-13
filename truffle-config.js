// const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider")
require("dotenv").config()

module.exports = {
	// See <http://truffleframework.com/docs/advanced/configuration> to customize your Truffle configuration!
	// contracts_build_directory: path.join(__dirname, "client/src/contracts"),
	networks: {
	  development: {
	    //host: "127.0.0.1",
        provider: function() { 
            return new HDWalletProvider(process.env.PRIVATE_KEY, "http://localhost:8545");
        },
	    //port: 8545,
	    network_id: "*",
	    skipDryRun: true
      }
	},
	compilers: {
		solc: {
			version: "^0.6.6",
		},
	},
}
