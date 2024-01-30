module.exports = (function () {
  function a() {
    this.$1 = new Set();
  }
  var b = a.prototype;
  b.addHook = function (a) {
    this.$1.add(a);
  };
  b.removeHook = function (a) {
    this.$1["delete"](a);
  };
  b.onConnectAttempt = function () {
    this.$1.forEach(function (a) {
      a.onConnectAttempt();
    });
  };
  b.onConnectFailure = function () {
    this.$1.forEach(function (a) {
      a.onConnectFailure();
    });
  };
  b.onConnected = function () {
    this.$1.forEach(function (a) {
      a.onConnected();
    });
  };
  b.onConnectSuccess = function () {
    this.$1.forEach(function (a) {
      a.onConnectSuccess();
    });
  };
  b.onConnectionLost = function () {
    this.$1.forEach(function (a) {
      a.onConnectionLost();
    });
  };
  b.onConnectionDisconnect = function () {
    this.$1.forEach(function (a) {
      a.onConnectionDisconnect();
    });
  };
  b.onSubscribe = function (a) {
    this.$1.forEach(function (b) {
      b.onSubscribe(a);
    });
  };
  b.onUnsubscribe = function (a) {
    this.$1.forEach(function (b) {
      b.onUnsubscribe(a);
    });
  };
  b.onPublish = function (a) {
    this.$1.forEach(function (b) {
      b.onPublish(a);
    });
  };
  b.onMessage = function (a) {
    this.$1.forEach(function (b) {
      b.onMessage(a);
    });
  };
  b.onWSFatal = function () {
    this.$1.forEach(function (a) {
      a.onWSFatal();
    });
  };
  return a;
})();
