#!/bin/bash
source .env

for (( ; ; ))
do
    pkill -f "node /usr/local/bin/ganache-cli"
    ganache-cli --fork https://mainnet.infura.io/v3/$INFURA_PROJECT_ID -i 1 -v --unlock 0x742d35Cc6634C0532925a3b844Bc454e4438f44e --unlock 0x66c57bF505A85A74609D2C83E94Aabb26d691E1F & 
    sleep 2
    node getSomeEth.js;
    truffle migrate 
    truffle exec replace.js 
    # wait for < 30 mins
    sleep 1750
done
