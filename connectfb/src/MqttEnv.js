let a = (c = d = e = (a) => require(`./${a}`)),
  f,
  g;
b = Object.freeze({
  mqtt_waterfall_log_client_sampling: 1,
  mqtt_ws_polling_enabled: 3,
  mqtt_lp_use_fetch: 9,
  mqtt_fast_lp: 11,
  mqtt_lp_no_delay: 12,
  mqtt_enable_publish_over_polling: 13,
  mqttweb_global_connection_counter: 15,
});
e = (function () {
  var a = b.prototype;
  a.random = function () {
    return this.$1 != null ? this.$1() : Math.random();
  };
  a.isUserLoggedInNow = function () {
    return this.$2 != null ? this.$2() : !0;
  };
  a.setIsUserLoggedInNow = function (a) {
    this.$2 = a;
  };
  a.clearTimeout = function (a) {
    if (this.$3 != null) {
      this.$3(a);
      return;
    }
    c("clearTimeout")(a);
  };
  a.setTimeout = function (a, b) {
    for (var d = arguments.length, e = new Array(d > 2 ? d - 2 : 0), f = 2; f < d; f++) e[f - 2] = arguments[f];
    return this.$4 != null ? this.$4.apply(null, arguments) : c("setTimeout").apply(null, arguments);
  };
  a.getLoggerInstance = function () {
    return this.$5 != null ? this.$5() : h.getInstance();
  };
  a.genGk = function (a) {
    return this.$6 != null ? this.$6(a) : !1;
  };
  a.createSocket = function (a, b) {
    return this.$7 != null ? this.$7(a, b) : d("MqttEnvWebSocket").createWebSocket(a);
  };
  a.scheduleCallback = function (a) {
    return this.$8 != null ? this.$8(a) : a();
  };
  a.scheduleLoggingCallback = function (a) {
    return this.$9 != null ? this.$9(a) : a();
  };
  a.configRead = function (a, b) {
    return this.$10 != null ? this.$10(a, b) : b;
  };
  a.configWrite = function (a, b) {
    this.$11 != null && this.$11(a, b);
  };
  function b() {
    (this.$1 = null),
      (this.$2 = null),
      (this.$3 = null),
      (this.$4 = null),
      (this.$5 = null),
      (this.$6 = null),
      (this.$7 = null),
      (this.$8 = null),
      (this.$9 = null),
      (this.$10 = null),
      (this.$11 = null);
  }
  a.initialize = function (a, b, c, d, e, f, g, h, i, j, k) {
    (this.$1 = a), (this.$2 = b), (this.$3 = c), (this.$4 = d), (this.$5 = e), (this.$6 = f), (this.$7 = g), (this.$8 = h), (this.$9 = i), (this.$10 = j), (this.$11 = k);
  };
  return b;
})();
var h = (function () {
    function a() {}
    a.getInstance = function () {
      return new a();
    };
    var b = a.prototype;
    b.setAppId = function (a) {};
    b.eventLogConnect = function (a) {};
    b.eventLogPull = function (a) {};
    b.eventLogPullFinish = function (a) {};
    b.eventLogDisconnect = function (a) {};
    b.eventLogOutgoingPublish = function (a) {};
    b.eventLogIncomingPublish = function (a) {};
    b.eventLogPublishTimeout = function (a) {};
    b.eventLogMiscellaneousError = function (a) {};
    b.logIfLoggedOut = function () {};
    b.logError = function (a) {};
    b.logErrorWarn = function (a) {};
    b.logWarn = function (a) {};
    b.debugTrace = function (a) {};
    b.bumpCounter = function (a) {};
    b.getBrowserConnectivity = function () {
      return !0;
    };
    return a;
  })(),
  i = new e();
function a(a) {
  i.setIsUserLoggedInNow(a);
}
g.MqttGkNames = b;
g.Env = i;
g.setIsUserLoggedInNow = a;
module.exports = g;
