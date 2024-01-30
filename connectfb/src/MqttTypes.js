let a, c, d, e, f, g;

a = function (a, b, c) {
  (this.errorCode = a), (this.errorName = b), (this.errorMessage = c);
};
b = Object.freeze({
  SOCKET_ERROR: new a(1, "SOCKET_ERROR", "Socket error"),
  SOCKET_MESSAGE: new a(2, "SOCKET_MESSAGE", "Unable to parse invalid socket message"),
  INVALID_DATA_TYPE: new a(3, "INVALID_DATA_TYPE", "Received non-arraybuffer from socket."),
  CONNECT_TIMEOUT: new a(4, "CONNECT_TIMEOUT", "Connect timed out"),
  CONNACK_FAILURE: new a(5, "CONNACK_FAILURE", "Connection failure due to connack"),
  PING_TIMEOUT: new a(6, "PING_TIMEOUT", "Ping timeout"),
  APP_DISCONNECT: new a(7, "APP_DISCONNECT", "Disconnect initiated by app"),
  SERVER_DISCONNECT: new a(8, "SERVER_DISCONNECT", "Disconnect message sent my server"),
  SOCKET_CLOSE: new a(9, "SOCKET_CLOSE", "Socket connection closed"),
  RECONNECT: new a(10, "RECONNECT", "Reconnecting"),
  BROWSER_CLOSE: new a(11, "BROWSER_CLOSE", "Browser closed"),
});
c = function (a, b) {
  (this.mqttError = a), (this.connAck = b);
};
d = (function (a) {
  babelHelpers.inheritsLoose(b, a);
  function b(b, c, d) {
    d === void 0 && (d = null);
    c = a.call(this, c) || this;
    c.isRecoverable = b;
    c.originalError = d;
    return c;
  }
  return b;
})(babelHelpers.wrapNativeSuper(Error));
f.MqttError = a;
f.MqttErrors = b;
f.ConnectFailure = c;
f.MqttChannelError = d;
module.exports = f;
