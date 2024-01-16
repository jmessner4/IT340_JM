const getBalance= require("./bank.js");
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
