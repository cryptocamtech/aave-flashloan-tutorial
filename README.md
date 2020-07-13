# AAVE Flashloan Tutorial

An Aave tutorial that can perform a flashloan using a forked mainnet. 

The code can be downloaded from https://github.com/cryptocamtech/aave-flashloan-tutorial.

Preparation:
```
    cp env .env  
    // update variables in .env as appropriate  
    npm install web3  
    npm install dotenv  
    npm install @truffle/hdwallet-provider
    npm install @openzeppelin/contracts
    truffle compile
```

And run:
```
    fork_main.sh 
    node sendDaiToContract.js
    node flashloan.js
```
