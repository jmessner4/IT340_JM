function cipher(value) {
    let c = '';
    for (let val of value) {
        c += '-';
    }
    return c;
}

module.exports = cipher;

console.log(cipher("hello"));