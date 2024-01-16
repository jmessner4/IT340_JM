const dao = require("./bankDAO.js");
const transfertFile = require("./bankTransfert.js");

function getBalance(accountID) {
    const balance = dao.retrieveBalance(accountID);
    console.log(`Your balance is : ${balance}€`);
    return balance;
}


function transferMoney(accountID, amount) {
    const transfert = transfertFile.transfertFunc(accountID, amount);
    return transfert
        .then(() => {dao.debitAccount(accountID, amount)})
        .catch(() => {console.log("Error in transfert")});
}

module.exports = {getBalance, transferMoney};