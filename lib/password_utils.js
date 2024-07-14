const crypto = require("crypto");

let encryptedKey, decryptedKey;
const algorithm = "aes-256-cbc";

const key = crypto
  .createHash('sha512')
  .update("secretKey")
  .digest('hex')
  .substring(0, 32);
const encryptionIV = crypto
  .createHash('sha512')
  .update("secretIV")
  .digest('hex')
  .substring(0, 16);

function encrypt(appPassword) {
  const cipher = crypto.createCipheriv(algorithm, key, encryptionIV)
  return Buffer.from(
    cipher.update(appPassword, 'utf8', 'hex') + cipher.final('hex')
  ).toString('base64')
}
function decrypt(encrypted_data, security_key, init_vector) {
  const buff = Buffer.from(encrypted_data, 'base64')
  const decipher = crypto.createDecipheriv(algorithm, key, encryptionIV)
  return (
    decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
    decipher.final('utf8')
  ) 
}

module.exports = {
  decrypt,
  encrypt,
};