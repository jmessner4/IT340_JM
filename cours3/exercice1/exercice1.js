function passwordCheck(password, customLength, customNbrDigit, customNbrChar, customSpec) {
    if (password.length >= customLength) {
        if (password.match(new RegExp(`[0-9]{${customNbrDigit}}`))) {
            if (password.match(new RegExp(`[a-zA-Z]{${customNbrChar}}`))) {
                if (password.match(new RegExp(`[${customSpec}]`)) || customSpec === '') {
                    return 'correct';
                } else {
                    return 'error specialized';
                }
            } else {
                return 'error char';
            }
        } else {
            return 'error digit';
        }
    } else {
        return 'error length';
    }
}

function passwordCheckBetter(password, customLength, customNbrDigit, customNbrChar, customSpec) {
    if (password.length >= customLength && password.match(new RegExp(`[0-9]{${customNbrDigit}}`) && password.match(new RegExp(`[a-zA-Z]{${customNbrChar}}`)) && ((customSpec === '') || password.match(new RegExp(`[${customSpec}]`))))) {
        return true;
    } else {
        return false;
    }
}

module.exports = passwordCheck;

//module.exports = passwordCheckBetter;