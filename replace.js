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

    replace.js

    Update the contract address in .env via 'truffle exec replace.js'.
    It dynamically updates the contract address in .env so we don't have to 
    update it all the time.
*/
const fs = require('fs');
const FlashLoan = artifacts.require("Flashloan");

module.exports = function() {
    console.log("address: " + FlashLoan.address);

    fs.readFile(".env", 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }

        // update the address
        var result = data.replace(/FLASHLOAN_CONTRACT_ADDR.*/g, 
                    "FLASHLOAN_CONTRACT_ADDR='" + FlashLoan.address + "'");

        fs.writeFile(".env", result, 'utf8', function (err) {
            if (err) return console.log(err);
            process.exit();
        });
    });
}
