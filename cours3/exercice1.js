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
        /*if (password.length < customLength) {
            return 'error length';
        } else if (!password.match(new RegExp(`[0-9]{${customNbrDigit}}`))) {
            return 'error digit';
        } else if (!password.match(new RegExp(`[a-zA-Z]{${customNbrChar}}`))) {
            return 'error char';
        } else {
            return 'error specialized';
        }*/
    }
}

module.exports = passwordCheck;

//module.exports = passwordCheckBetter;