const {getBalance, transferMoney} = require("./bank.js");
const dao = require("./bankDAO.js");
const trsf = require("./bankTransfert.js");

const mock_value = 1000000;

afterEach(() => {
    // restaure l'espion créé avec spyOn
    jest.restoreAllMocks();
});

test("AppelRetrieveBalance", () => {
    const spy = jest.spyOn(dao, 'retrieveBalance').mockImplementation(()=>{return mock_value});

    const accountID = "123456789";
    const balance = getBalance(accountID);

    expect(spy).toHaveBeenCalled();
    expect(spy).toBeCalledWith(accountID);

    expect(balance).toEqual(mock_value);
})

/*
test("Function transfertMoney Original", () => {
    const spy = jest.spyOn(trsf, 'transfertFunc');
    const spy2 = jest.spyOn(dao, 'debitAccount');

    const accountID = "123456789";
    const amount = 10;

    transferMoney(accountID, amount);

    expect(spy).toHaveBeenCalled();
    expect(spy).toBeCalledWith(accountID, amount);

    expect(spy2).toHaveBeenCalled();
    expect(spy2).toBeCalledWith(accountID, amount);
})*/

test("Function transfertMoney Resolve", async () => {
    const spy = jest.spyOn(trsf, 'transfertFunc').mockImplementation((accountID, amount) => {
      return Promise.resolve();
    });
  
    const spy2 = jest.spyOn(dao, 'debitAccount');
  
    const accountID = "123456789";
    const amount = 10;
  
    await transferMoney(accountID, amount);
  
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(accountID, amount);
  
    expect(spy2).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalledWith(accountID, amount);
  });
  
  
  test("Function transfertMoney Reject", async () => {
    const spy = jest.spyOn(trsf, 'transfertFunc').mockImplementation((accountID, amount) => {
      return Promise.reject({ message: 'Failed to debit account' });
    });
  
    const spy2 = jest.spyOn(dao, 'debitAccount');
  
    const accountID = "123456789";
    const amount = 10;
  
    await transferMoney(accountID, amount);
  
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(accountID, amount);
  
    expect(spy2).not.toHaveBeenCalled();
  
  });