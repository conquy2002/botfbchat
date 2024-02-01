function wsConnection({ ws, username, password, _2fa, page, cookie }) {
  this.ws = ws;
  this.username = username;
  this.password = password;
  this._2fa = _2fa;
  this.page = page;
  this.userId = null;
  this.error = {};
  if (cookie && getType(cookie) === "Array") {
    this.cookie = cookie.map((a) => ({
      name: a.key,
      value: a.value,
      domain: "." + a.domain,
      path: a.path,
      httpOnly: a.hostOnly,
      sameSite: "None",
      secure: true,
      sameParty: false,
      sourceScheme: "Secure",
      sourcePort: 443,
    }));
  }
}
let w = wsConnection.prototype;
w.checkLogin = function () {
  let page = this.page;
};
module.exports = wsConnection;
