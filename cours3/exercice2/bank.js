const dao = require("./bankDAO.js");

function getBalance(accountID) {
    const balance = dao.retrieveBalance(accountID);
    console.log(`Your balance is : ${balance}€`);
    return balance;
}

module.exports = getBalance;