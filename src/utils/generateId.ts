const CryptoJS = require('crypto-js');

export function generateId(data: string) {
    const hash = CryptoJS.SHA256(data);

    return hash.toString(CryptoJS.enc.Hex);
}
