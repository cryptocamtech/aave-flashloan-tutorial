#!/bin/bash
source .env

for (( ; ; ))
do
    pkill -f "node /usr/local/bin/ganache-cli"
    ganache-cli --fork https://mainnet.infura.io/v3/$INFURA_PROJECT_ID -i 1 -v --unlock 0x742d35Cc6634C0532925a3b844Bc454e4438f44e --unlock 0x07bb41df8c1d275c4259cdd0dbf0189d6a9a5f32 & 
    sleep 2
    node getSomeEth.js;
    truffle migrate 
    truffle exec replace.js 
    # wait for < 30 mins
    sleep 1750
done
