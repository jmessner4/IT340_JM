function retrieveBalance(accountID) {
    console.log("Retrieve balance");
    console.log(`${accountID}`);
    return 1000000;
}

function debitAccount(accountID, amount) {
    console.log(`-${amount} sur le compte ${accountID}`);
}

module.exports = {retrieveBalance, debitAccount};