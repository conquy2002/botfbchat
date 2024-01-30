const WebSocket = require("ws");
let a = (c = d = e = (a) => require(`./${a}`)),
  f,
  g;
var h = 20,
  i = 6e4;
a = (function () {
  function a(a) {
    var b = this;
    this.$12 = function (a, c, e) {
      c === void 0 && (c = null);
      b.$9.bumpCounter("protocol.debug.disconnect.internal." + a.errorName);
      b.$9.bumpCounter("protocol.debug.disconnect.internal");
      var f = b.$5,
        g = b.$2,
        h = g.onConnectFailure,
        i = g.onConnectionLost;
      b.setConnected(!1);
      b.$14();
      f
        ? d("MqttEnv").Env.scheduleCallback(function () {
            i(a, c);
          })
        : d("MqttEnv").Env.scheduleCallback(function () {
            h(b.$11, new (d("MqttTypes").ConnectFailure)(a, e != null ? e : -1), c);
          });
    };
    this.$13 = function (a) {
      var c = b.$6;
      if (c == null) {
        b.$9.bumpCounter("protocol.socket_send.failed.socket_null.<message type>");
        return 0;
      }
      if (c.readyState !== c.OPEN) {
        b.$9.bumpCounter("protocol.socket_send.failed.socket_not_open.<message type>");
        return 0;
      }
      a = a.encode();
      var d = a.byteLength;
      c.send(a);
      return d;
    };
    this.$3 = a;
    this.$2 = {
      getKeepAliveIntervalSeconds: function () {
        return 10;
      },
      getKeepAliveTimeoutSeconds: function () {
        return 10;
      },
      ignoreSubProtocol: !1,
      mqttVersion: 3,
      onConnectFailure: function (a, b, c) {},
      onConnection: function () {},
      onConnectionLost: function (a, b) {},
      onConnectSuccess: function (a) {},
      onMessageArrived: function (a, b, c) {},
      onMessageDelivered: function (a) {},
      userName: "",
    };
    this.$1 = "mqttwsclient";
    this.$4 = 0;
    this.$5 = !1;
    this.$9 = d("MqttEnv").Env.getLoggerInstance();
    this.$11 = 0;
  }
  var b = a.prototype;
  b.connect = function (a) {
    var b = this;
    if (b.$5) return console.error("Invalid state: connect - already connected");
    this.$2 = a;
    this.setConnected(!1);
    this.$7 != null && (clearTimeout(this.$7), (this.$7 = null));
    this.$7 = setTimeout(function () {
      b.$9.bumpCounter("protocol.error.connect.timeout"), b.$12(d("MqttTypes").MqttErrors.CONNECT_TIMEOUT);
    }, h * 1e3);
    this.$6 = new WebSocket(this.$3);
    this.$6.binaryType = "arraybuffer";
    this.$6.onopen = function () {
      b.setConnected(!0);
      b.$9.debugTrace("Socket-Open", "MQTTProtocolClient Socket Open");
      b.$11 = b.$13(new (d("MqttProtocolCodec").WireMessage.Connect)(b.$1, a));
      a.onConnection();
    };
    this.$6.onmessage = function (a) {
      a = a.data;
      if (!(a instanceof ArrayBuffer)) {
        b.$9.bumpCounter("protocol.error.onmessage.type");
        b.$12(d("MqttTypes").MqttErrors.INVALID_DATA_TYPE);
        return;
      }
      try {
        a = new Uint8Array(a);
        b.$10 != null && ((a = d("MqttProtocolUtils").concatBuffers(b.$10, a)), b.$9.bumpCounter("protocol.debug.usingMessagesBuffer"), delete b.$10, (b.$10 = null));
        a = d("MqttProtocolCodec").decodeByteMessages(a);
        var c = a.messages;
        b.$10 = a.remaining;
        for (a = 0; a < c.length; a++) b.handleMessage(c[a]);
      } catch (a) {
        (b.$10 = null),
          b.$9.logError(a, d("MqttTypes").MqttErrors.SOCKET_MESSAGE.errorMessage),
          b.$9.bumpCounter("protocol.error.onmessage.parse"),
          b.$12(d("MqttTypes").MqttErrors.SOCKET_MESSAGE, a.message);
      }
    };
    this.$6.onerror = function (a) {
      b.$9.bumpCounter("protocol.error.socket");
      b.$9.debugTrace("Socket-Error", "MQTTProtocolClient Socket Error");
      b.$12(d("MqttTypes").MqttErrors.SOCKET_ERROR);
    };
    this.$6.onclose = function (a) {
      b.$9.bumpCounter("protocol.socket.close"), a.wasClean || b.$9.debugTrace("Socket-Unclean-Close", "MQTTProtocolClient error code: " + a.code + " reason: " + a.reason);
      b.$12(d("MqttTypes").MqttErrors.SOCKET_CLOSE, a.code + " : " + a.reason);
    };
    this.$8 != null && this.$8.cancel();
    this.$8 = new (d("MqttProtocolUtils").Pinger)(a.getKeepAliveIntervalSeconds, a.getKeepAliveTimeoutSeconds, this.$13.bind(this, new (d("MqttProtocolCodec").WireMessage.Ping)("PINGREQ")), function (
      a,
      c
    ) {
      return b.$12(d("MqttTypes").MqttErrors.PING_TIMEOUT, a, c);
    });
  };
  b.isConnected = function () {
    return this.$5;
  };
  b.setConnected = function (a) {
    this.$5 = a;
  };
  b.$14 = function () {
    var a = this;
    this.setConnected(!1);
    this.$8 != null && this.$8.cancel();
    this.$7 != null && (clearTimeout(this.$7), (this.$7 = null));
    this.$6 != null &&
      ((this.$6.onopen = function (b) {
        a.$9.debugTrace("Socket Open After Teardown", "Socket opening after teardown");
      }),
      (this.$6.onmessage = function (a) {}),
      (this.$6.onerror = function (a) {}),
      (this.$6.onclose = function (b) {
        a.$9.debugTrace("Socket Close After Teardown", "code: " + b.code + ", reason: " + b.reason);
      }),
      this.$6.close(),
      (this.$6 = null));
    this.$2.onConnectSuccess = function (a) {};
    this.$2.onConnectFailure = function (a, b) {};
    this.$2.onConnection = function () {};
    this.$2.onConnectionLost = function (a) {};
    this.$2.onMessageArrived = function (a, b, c) {};
    this.$2.onMessageDelivered = function (a) {};
  };
  b.disconnect = function (a) {
    if (this.$6 == null || this.$6.readyState !== this.$6.OPEN || !this.$5) {
      this.$14();
      return;
    }
    this.$13(new (d("MqttProtocolCodec").WireMessage.Disconnect)());
    this.$9.bumpCounter("protocol.debug.disconnect");
    this.$12(a);
  };
  b.subscribe = function (a) {
    if (!this.$5) {
      this.$9.bumpCounter("protocol.error.subscribe.notconnected");
      throw "Invalid state: subscribe - not connected";
    }
    this.$9.bumpCounter("protocol.subscribe." + a);
    a = new (d("MqttProtocolCodec").WireMessage.Subscription)("SUBSCRIBE", a, 0, this.$15());
    this.$13(a);
  };
  b.unsubscribe = function (a) {
    if (!this.$5) {
      this.$9.bumpCounter("protocol.error.unsubscribe.notconnected");
      throw "Invalid state: unsubscribe - not connected";
    }
    this.$9.bumpCounter("protocol.unsubscribe." + a);
    a = new (d("MqttProtocolCodec").WireMessage.Subscription)("UNSUBSCRIBE", a, 0, this.$15());
    this.$13(a);
  };
  b.publish = function (a, b, c) {
    return this.$16(a, d("MqttProtocolCodec").createMessageWithString(b), c);
  };
  b.publishBinary = function (a, b, c) {
    return this.$16(a, d("MqttProtocolCodec").createMessageWithBytes(b), c);
  };
  b.$16 = function (a, b, c) {
    this.$5 || this.$9.bumpCounter("protocol.error.publish.notconnected");
    this.$9.bumpCounter("protocol.publish." + a);
    var e = this.$15();
    a = new (d("MqttProtocolCodec").WireMessage.Publish)(a, b, c, e);
    this.$13(a);
    return e;
  };
  b.$15 = function () {
    ++this.$4 === i && (this.$4 = 1);
    return this.$4;
  };
  b.handleMessage = function (a) {
    var b = this;
    switch (a.messageType) {
      case d("MqttProtocolCodec").MESSAGE_TYPE.CONNACK:
        this.$7 != null && (d("MqttEnv").Env.clearTimeout(this.$7), (this.$7 = null));
        if (a instanceof d("MqttProtocolCodec").WireMessage.ConnAck) {
          var e = a;
          if (e.returnCode !== 0) {
            this.$9.bumpCounter("protocol.error.connack.invalidreturncode");
            this.setConnected(!1);
            this.$12(d("MqttTypes").MqttErrors.CONNACK_FAILURE, "connack code=" + e.returnCode, e.returnCode);
            return;
          }
          d("MqttEnv").Env.scheduleCallback(function () {
            b.$2.onConnectSuccess(b.$11);
          });
          this.$8 != null && this.$8.reset();
        }
        break;
      case d("MqttProtocolCodec").MESSAGE_TYPE.PUBLISH:
        if (a instanceof d("MqttProtocolCodec").WireMessage.Publish) {
          var f = a;
          d("MqttEnv").Env.scheduleCallback(function () {
            b.$2.onMessageArrived(f.topic, f.payloadMessage, f.qos);
          });
          e = f.messageIdentifier;
          this.$9.bumpCounter("protocol.publish.received");
          if (f.qos === 1 && e != null) {
            e = new (d("MqttProtocolCodec").WireMessage.PubAckUnsubAck)("PUBACK", e);
            this.$13(e);
          }
        }
        break;
      case d("MqttProtocolCodec").MESSAGE_TYPE.PUBACK:
        if (a instanceof d("MqttProtocolCodec").WireMessage.PubAckUnsubAck) {
          e = a;
          var g = e.messageIdentifier;
          this.$9.bumpCounter("protocol.puback.received");
          d("MqttEnv").Env.scheduleCallback(function () {
            b.$2.onMessageDelivered(g);
          });
        }
        break;
      case d("MqttProtocolCodec").MESSAGE_TYPE.PINGRESP:
        this.$8 != null && this.$8.reset();
        break;
      case d("MqttProtocolCodec").MESSAGE_TYPE.DISCONNECT:
        this.$12(d("MqttTypes").MqttErrors.SERVER_DISCONNECT);
        break;
      case d("MqttProtocolCodec").MESSAGE_TYPE.SUBACK:
        this.$9.bumpCounter("protocol.suback.received");
        break;
      case d("MqttProtocolCodec").MESSAGE_TYPE.UNSUBACK:
        this.$9.bumpCounter("protocol.unsuback.received");
        break;
      default:
        this.$9.logError("MqttProtocolClient: Received unhandled message type: " + a.messageType, "Received unhandled message type");
        this.$9.bumpCounter("protocol.error.handlemessage.unsupportedtype");
        break;
    }
  };
  return a;
})();
module.exports = a;
