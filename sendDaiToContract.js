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

    sendDaiToContract.js

    The flashloan needs some DAI to pay for fees
*/
const Web3 = require('web3');
require('dotenv').config();

const url = process.env.URL;
console.log("url: " + url);
const web3 = new Web3(url);

// "borrow" from this account - must be unlocked in ganache-cli
const daiBorrowAccount = process.env.DAI_BORROWER_ADRESS;

const daiABI = require('./ABIs/DAI.json');
const daiAmountInWei = 10 * 10**18; // 10 dai
const daiAddress = '0x6b175474e89094c44da98b954eedeac495271d0f';
const flashLoanContractAddress = process.env.FLASHLOAN_CONTRACT_ADDR;

const init = async () => {
    const gasPrice = await web3.eth.getGasPrice();
    const daiContract = new web3.eth.Contract(daiABI, daiAddress);

    // transfer some dai from our special account to the flashloan contract
    const transferFrom = daiContract.methods.transferFrom(daiBorrowAccount, 
                    flashLoanContractAddress, daiAmountInWei.toString());

    await transferFrom.send({ 
            from: daiBorrowAccount,
            gasLimit: web3.utils.toHex(60000),
            gasPrice
        })
        .catch((e) => { throw Error(`Error approving DAI allowance: ${e.message}`) });

    // should be whatever we've transferred in wei
    const balance = await daiContract.methods.balanceOf(flashLoanContractAddress).call()
        .catch(e => { throw Error('Error getting balance: ' + e.message); });
    console.log("dai balance: " + web3.utils.fromWei(balance, 'ether'));
    console.log("success!");
}

init();
