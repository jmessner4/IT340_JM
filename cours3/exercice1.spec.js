//const passwordCheckBetter = require("./exercice1");

const passwordCheck = require("./exercice1");

function passwordCheckBetter(password, customLength, customNbrDigit, customNbrChar, customSpec) {
    if (password.length >= customLength && password.match(new RegExp(`[0-9]{${customNbrDigit}}`) && password.match(new RegExp(`[a-zA-Z]{${customNbrChar}}`)) && ((customSpec === '') || password.match(new RegExp(`[${customSpec}]`))))) {
        return true;
    } else {
        return false;
    }
}



test("passwordLength", () => {
    //C'est dans cette fonction callback qu'on code le test
    expect(passwordCheck("coucou123&",8,1,1,'!?:=+_$*€()<>%&')).toEqual("correct");

    expect(passwordCheck("couc1&",8,1,1,'!?:=+_$*€()<>%&')).toEqual("error length");
});

test("passwordDigit", ( )=> {
    expect(passwordCheck("coucou123&",8,1,1,'!?:=+_$*€()<>%&')).toEqual("correct");

    expect(passwordCheck("coucoucou&",8,1,1,'!?:=+_$*€()<>%&')).toEqual("error digit");

    expect(passwordCheck("coucoucou12&",8,3,1,'!?:=+_$*€()<>%&')).toEqual("error digit");
})

test("passwordChar", ( )=> {
    expect(passwordCheck("coucou123&",8,1,1,'!?:=+_$*€()<>%&')).toEqual("correct");

    expect(passwordCheck("12345678&",8,1,1,'!?:=+_$*€()<>%&')).toEqual("error char");

    expect(passwordCheck("12345678az",8,1,3,'!?:=+_$*€()<>%&')).toEqual("error char");
})

test("passwordSpec", ( )=> {
    expect(passwordCheck("coucou123&",8,1,1,'!?:=+_$*€()<>%&')).toEqual("correct");

    expect(passwordCheck("coucouu123",8,1,1,'!?:=+_$*€()<>%&')).toEqual("error specialized");
})

/*
test("passwordGlobal", () => {
    //C'est dans cette fonction callback qu'on code le test
    expect(passwordCheck("coucou123!",8,1,1,'!?:=+_$*€()<>%&')).toEqual("correct");

    expect(passwordCheck("couc1&",8,1,1,'!?:=+_$*€()<>%&')).toEqual("error length");

    expect(passwordCheck("coucoucou&",8,1,1,'!?:=+_$*€()<>%&')).toEqual("error digit");

    expect(passwordCheck("12345678&",8,1,1,'!?:=+_$*€()<>%&')).toEqual("error char");

    expect(passwordCheck("coucouu123",8,1,1,'!?:=+_$*€()<>%&')).toEqual("error specialized");
});
*/

/*
test("passwordGlobalBetter", () => {
    expect(passwordCheckBetter("coucou123&",8,1,1,'!?:=+_$*€()<>%&')).toEqual(true);

    expect(passwordCheckBetter("couc1&",8,1,1,'!?:=+_$*€()<>%&')).toEqual(false);

    expect(passwordCheckBetter("coucoucou&",8,1,1,'!?:=+_$*€()<>%&')).toEqual(false);

    expect(passwordCheckBetter("12345678&",8,1,1,'!?:=+_$*€()<>%&')).toEqual(false);

    expect(passwordCheckBetter("coucouu123",8,1,1,'!?:=+_$*€()<>%&')).toEqual(false);
});
*/