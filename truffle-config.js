// const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider")
require("dotenv").config()

module.exports = {
	// See <http://truffleframework.com/docs/advanced/configuration> to customize your Truffle configuration!
	// contracts_build_directory: path.join(__dirname, "client/src/contracts"),
	networks: {
	  development: {
        provider: function() { 
            return new HDWalletProvider(process.env.PRIVATE_KEY, process.env.URL);
        },
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
