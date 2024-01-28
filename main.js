const { getSignatureID } = require("./utils");
const { encode } = require("./utils/jwt");

console.log(encode({ username: 1 }, getSignatureID()));
