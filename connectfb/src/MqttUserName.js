let a = (c = d = e = (a) => require(`./${a}`)),
  f,
  g;

a = (function () {
  function a(a, b, c, e, f, g, h, i, j, k, l) {
    h === void 0 && (h = null),
      i === void 0 && (i = ""),
      j === void 0 && (j = "websocket"),
      k === void 0 && (k = null),
      l === void 0 && (l = null),
      (this.$1 = a),
      (this.$2 = b),
      (this.$3 = c),
      (this.$4 = e),
      (this.$5 = f),
      (this.$6 = g),
      (this.$7 = true),
      (this.$8 = h),
      (this.$9 = i),
      (this.$10 = j),
      (this.$11 = k),
      (this.$12 = l);
  }
  var b = a.prototype;
  b.gen = function (a, b, c, e) {
    e === void 0 && (e = []);
    var f = true; //getMqttForegroundStatus
    c = c.map(function (a) {
      a = {
        isBase64Publish: !1,
        messageId: a.messageId,
        payload: a.payload,
        qos: a.qos,
        topic: a.topic,
      };
      typeof a.payload !== "string" && ((a.payload = btoa(String.fromCharCode.apply(null, a.payload))), (a.isBase64Publish = !0));
      return a;
    });
    f = {
      a: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      aid: this.$5,
      aids: this.$12 != null ? Object.fromEntries(this.$12) : null,
      chat_on: this.$6,
      cp: this.$3,
      ct: this.$10,
      d: this.$4,
      dc: "",
      ecp: this.$2,
      fg: f,
      gas: this.$8,
      mqtt_sid: "",
      no_auto_fg: !0,
      p: this.$11,
      pack: e,
      php_override: this.$9,
      pm: c,
      s: a,
      st: b,
      u: this.$1,
    };
    return JSON.stringify(f);
  };
  b.setForegroundState = function (a) {
    this.$7 = a;
  };
  b.setChatVisibility = function (a) {
    this.$6 = a;
  };
  b.getEndpointCapabilities = function () {
    return this.$2;
  };
  b.getDeviceId = function () {
    return this.$4;
  };
  b.setEndpointCapabilities = function (a) {
    this.$2 = a;
  };
  b.getIsGuestAuthStringPresent = function () {
    return this.$8 !== null;
  };
  return a;
})();
module.exports = a;
