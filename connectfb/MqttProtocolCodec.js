const MqttProtocolUtils = require('./MqttProtocolUtils');
const MqttUtils = require('./MqttUtils');
let a, b, c, d, e, f, g;
var h = Object.freeze({
    CONNECT: 1,
    CONNACK: 2,
    PUBLISH: 3,
    PUBACK: 4,
    SUBSCRIBE: 8,
    SUBACK: 9,
    UNSUBSCRIBE: 10,
    UNSUBACK: 11,
    PINGREQ: 12,
    PINGRESP: 13,
    DISCONNECT: 14,
  }),
  i = [0, 6, 77, 81, 73, 115, 100, 112, 3];
function j(a, b) {
  b = b;
  var e = b,
    f = a[b],
    g = f >> 4;
  b += 1;
  var i = MqttProtocolUtils.decodeMultiByteInt(a, b);
  if (i == null)
    return {
      position: e,
      wireMessage: null,
    };
  b = i.offset;
  i = b + i.value;
  if (i > a.length)
    return {
      position: e,
      wireMessage: null,
    };
  var j;
  switch (g) {
    case h.CONNACK:
      e = a[b++];
      e = !!(e & 1);
      var o = a[b++];
      j = new m(e, o);
      break;
    case h.PUBLISH:
      e = f & 15;
      o = (e >> 1) & 3;
      f = MqttProtocolUtils.readUInt16BE(a, b);
      b += 2;
      var r = MqttProtocolUtils.convertUTF8ToString(a, b, f);
      b += f;
      f = null;
      o === 1 && ((f = MqttProtocolUtils.readUInt16BE(a, b)), (b += 2));
      var s = p.createWithBytes(a.subarray(b, i)),
        t = (e & 1) === 1;
      e = (e & 8) === 8;
      j = new q(r, s, o, f, t, e);
      break;
    case h.PINGREQ:
      j = new k('PINGREQ');
      break;
    case h.PINGRESP:
      j = new k('PINGRESP');
      break;
    case h.PUBACK:
    case h.UNSUBACK:
      r = MqttProtocolUtils.readUInt16BE(a, b);
      j = new n(g === h.PUBACK ? 'PUBACK' : 'UNSUBACK', r);
      break;
    case h.SUBACK:
      s = MqttProtocolUtils.readUInt16BE(a, b);
      b += 2;
      o = a.subarray(b, i);
      j = new l(s, o);
      break;
    default:
      throw MqttUtils.sprintf('Invalid MQTT message type %s.', g);
  }
  return {
    position: i,
    wireMessage: j,
  };
}
function a(a) {
  var b = [],
    c = 0;
  while (c < a.length) {
    var d = j(a, c),
      e = d.wireMessage;
    c = d.position;
    if (e) b.push(e);
    else break;
  }
  d = null;
  c < a.length && (d = a.subarray(c));
  return {
    messages: b,
    remaining: d,
  };
}
b = (function () {
  function a(a) {
    this.messageType = h[a];
  }
  var b = a.prototype;
  b.encode = function () {
    throw new TypeError('Cannot abstract class WireMessage');
  };
  return a;
})();
var k = (function (b) {
  babelHelpers.inheritsLoose(a, b);
  function a(a) {
    return b.call(this, a) || this;
  }
  var c = a.prototype;
  c.encode = function () {
    var a = new ArrayBuffer(2),
      b = new Uint8Array(a);
    b[0] = (this.messageType & 15) << 4;
    return a;
  };
  return a;
})(b);
e = (function (a) {
  babelHelpers.inheritsLoose(b, a);
  function b() {
    return a.call(this, 'DISCONNECT') || this;
  }
  var c = b.prototype;
  c.encode = function () {
    var a = (this.messageType & 15) << 4,
      b = new ArrayBuffer(2),
      c = new Uint8Array(b);
    c[0] = a;
    c.set(MqttProtocolUtils.encodeMultiByteInt(0), 1);
    return b;
  };
  return b;
})(b);
var l = (function (b) {
    babelHelpers.inheritsLoose(a, b);
    function a(a, c) {
      var d;
      d = b.call(this, 'SUBACK') || this;
      d.messageIdentifier = a;
      d.returnCode = c;
      return d;
    }
    return a;
  })(b),
  m = (function (b) {
    babelHelpers.inheritsLoose(a, b);
    function a(a, c) {
      var d;
      d = b.call(this, 'CONNACK') || this;
      d.sessionPresent = a;
      d.returnCode = c;
      return d;
    }
    return a;
  })(b),
  n = (function (b) {
    babelHelpers.inheritsLoose(a, b);
    function a(a, c) {
      a = b.call(this, a) || this;
      a.messageIdentifier = c;
      return a;
    }
    var c = a.prototype;
    c.encode = function () {
      var a = (this.messageType & 15) << 4,
        b = 2,
        c = MqttProtocolUtils.encodeMultiByteInt(b),
        e = c.length + 1;
      b = new ArrayBuffer(b + e);
      var f = new Uint8Array(b);
      f[0] = a;
      f.set(c, 1);
      e = MqttProtocolUtils.writeUInt16BE(this.messageIdentifier, f, e);
      return b;
    };
    return a;
  })(b);
f = (function (a) {
  babelHelpers.inheritsLoose(b, a);
  function b(b, c) {
    var d;
    d = a.call(this, 'CONNECT') || this;
    d.clientId = b;
    d.connectOptions = c;
    return d;
  }
  var c = b.prototype;
  c.encode = function () {
    var a,
      b = (this.messageType & 15) << 4,
      c = i.length + 3;
    c += (a = MqttProtocolUtils).UTF8Length(this.clientId) + 2;
    c += a.UTF8Length(this.connectOptions.userName) + 2;
    var e = a.encodeMultiByteInt(c);
    c = new ArrayBuffer(1 + e.length + c);
    var f = new Uint8Array(c);
    f[0] = b;
    b = 1;
    f.set(e, 1);
    b += e.length;
    f.set(i, b);
    b += i.length;
    e = 2 | 128;
    f[b++] = e;
    b = a.writeUInt16BE(this.connectOptions.getKeepAliveIntervalSeconds(), f, b);
    b = a.writeString(this.clientId, a.UTF8Length(this.clientId), f, b);
    b = a.writeString(this.connectOptions.userName, a.UTF8Length(this.connectOptions.userName), f, b);
    return c;
  };
  return b;
})(b);
var o = (function (b) {
    babelHelpers.inheritsLoose(a, b);
    function a(a, c, e, f) {
      var g;
      g = b.call(this, a) || this;
      g.topic = c;
      if ((e < 0 && e > 1) || (e === 1 && f == null))
        throw new TypeError(MqttUtils.sprintf('Argument Invalid. qos: %s messageType: %s.', e, a));
      g.qos = e;
      g.messageIdentifier = f;
      return g;
    }
    var c = a.prototype;
    c.encode = function () {
      var a = (this.messageType & 15) << 4;
      a |= 2;
      var b = MqttProtocolUtils.UTF8Length(this.topic),
        c = 2 + b + 2;
      this.messageType === h.SUBSCRIBE && (c += 1);
      var e = MqttProtocolUtils.encodeMultiByteInt(c);
      c = new ArrayBuffer(1 + e.length + c);
      var f = new Uint8Array(c);
      f[0] = a;
      a = 1;
      f.set(e, 1);
      a += e.length;
      this.messageIdentifier != null && (a = MqttProtocolUtils.writeUInt16BE(this.messageIdentifier, f, a));
      a = MqttProtocolUtils.writeString(this.topic, b, f, a);
      this.messageType === h.SUBSCRIBE && this.qos != null && (f[a++] = this.qos);
      return c;
    };
    return a;
  })(b),
  p = (function () {
    function a(a, b) {
      (this.payloadString = a), (this.payloadBytes = b);
    }
    a.createWithString = function (b) {
      var c = new Uint8Array(new ArrayBuffer(MqttProtocolUtils.UTF8Length(b)));
      MqttProtocolUtils.convertStringToUTF8(b, c, 0);
      return new a(b, c);
    };
    a.createWithBytes = function (b) {
      var c = MqttProtocolUtils.convertUTF8ToString(b, 0, b.length);
      return new a(c, b);
    };
    var b = a.prototype;
    b.string = function () {
      return this.payloadString;
    };
    b.bytes = function () {
      return this.payloadBytes;
    };
    return a;
  })(),
  q = (function (b) {
    babelHelpers.inheritsLoose(a, b);
    function a(a, c, d, e, f, g) {
      var h;
      h = b.call(this, 'PUBLISH') || this;
      h.topic = a;
      h.payloadMessage = c;
      h.qos = d;
      h.messageIdentifier = e;
      h.retained = f != null ? f : !1;
      h.duplicate = g != null ? g : !1;
      if (h.qos === 1 && h.messageIdentifier == null)
        throw new TypeError('Argument Invalid. messageIdentifier: null and qos: 1');
      return h;
    }
    var c = a.prototype;
    c.encode = function () {
      var a = (this.messageType & 15) << 4;
      this.duplicate && (a |= 8);
      a = a |= this.qos << 1;
      this.retained && a != 1;
      var b = MqttProtocolUtils.UTF8Length(this.topic),
        c = b + 2,
        e = this.qos === 0 ? 0 : 2;
      c += e;
      e = this.payloadMessage.bytes();
      c += e.byteLength;
      var f = MqttProtocolUtils.encodeMultiByteInt(c);
      c = new ArrayBuffer(1 + f.length + c);
      var g = new Uint8Array(c);
      g[0] = a;
      g.set(f, 1);
      a = 1 + f.length;
      a = MqttProtocolUtils.writeString(this.topic, b, g, a);
      this.qos !== 0 &&
        this.messageIdentifier != null &&
        (a = MqttProtocolUtils.writeUInt16BE(this.messageIdentifier, g, a));
      g.set(e, a);
      return c;
    };
    return a;
  })(b),
  r = p.createWithString,
  s = p.createWithBytes;
b = {
  Base: b,
  ConnAck: m,
  Connect: f,
  Disconnect: e,
  Ping: k,
  PubAckUnsubAck: n,
  Publish: q,
  Subscription: o,
};
g.MESSAGE_TYPE = h;
g.decodeMessage = j;
g.decodeByteMessages = a;
g.Message = p;
g.createMessageWithString = r;
g.createMessageWithBytes = s;
g.WireMessage = b;
module.exports = g;
