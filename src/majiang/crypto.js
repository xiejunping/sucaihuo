const CryptoJS = require("crypto-js");

// Encrypt
// const ciphertext = CryptoJS.AES.encrypt('123', 'secret key 123');

// console.log(ciphertext.toString());

// Decrypt
const bytes = CryptoJS.AES.decrypt('U2FsdGVkX19Go0gRVmnFipB3nNsG33uLLLDHNDT+vZg=', 'WAPMAN');
const plaintext = bytes.toString(CryptoJS.enc.Utf8);

console.log(plaintext);