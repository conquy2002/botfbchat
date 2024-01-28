var jwt = require("jsonwebtoken");

module.exports = {
  encode: (data, pass) => {
    if (typeof data != "string") data = JSON.stringify(data);
    return jwt.sign(data, pass, {
      algorithm: "HS256",
      subject: pass,
    });
  },
  decode: (token, pass) => {
    var decoded;
    try {
      decoded = jwt.verify(token, pass);
      return decoded;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
};
