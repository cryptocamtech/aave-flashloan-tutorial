/*
    Copyright (c) 2020, Cameron Hamilton-Rich

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted, provided that the above
    copyright notice and this permission notice appear in all copies.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
    WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
    MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
    ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
    WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
    ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
    OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

    note: Copy env to .env and update the private key to your account.
    note: need to run 'truffle exec replace.js'

    flashloan.js
*/
const Web3 = require('web3');
const dotenv = require('dotenv').config();
const url = process.env.URL;
console.log("url: " + url);
const web3 = new Web3(url);

const daiABI = require('./ABIs/DAI.json');
const daiAddress = '0x6b175474e89094c44da98b954eedeac495271d0f';

const flashLoanABI = require('./build/contracts/Flashloan.json').abi;
const flashLoanContractAddress = process.env.FLASHLOAN_CONTRACT_ADDR;

const init = async () => {
    const gasPrice = await web3.eth.getGasPrice();

    // import the account via the private key and impicitly sign
    const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
    web3.eth.accounts.wallet.add(account);
    const myAccount = account.address;
    console.log("account: " + myAccount);

    // get the balance of the dai contract
    const daiContract = new web3.eth.Contract(daiABI, daiAddress);
    let balance = await daiContract.methods.balanceOf(flashLoanContractAddress).call()
        .catch(e => { throw Error('Error getting balance: ' + e.message); });
    console.log("initial dai balance: " + web3.utils.fromWei(balance, 'ether'));

    // do the flashloan using the dai contract
    const flashContract = new web3.eth.Contract(flashLoanABI, 
                flashLoanContractAddress);
    const flashLoan = flashContract.methods.flashloan(daiAddress);
    await flashLoan.send({ 
            from: myAccount,
            gasLimit: web3.utils.toHex(300000),
            gasPrice
        })
        .catch((e) => { throw Error(`Error getting flash loan: ${e.message}`) });

    // balance in the contract will be 0.09% less due to the fee
    balance = await daiContract.methods.balanceOf(flashLoanContractAddress).call()
        .catch(e => { throw Error('Error getting balance: ' + e.message); });
    console.log("final dai balance: " + web3.utils.fromWei(balance, 'ether'));
    console.log("success!");
}

init();
