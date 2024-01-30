let a, b, c, d, e, f, g;

function a(a, b) {
  if (a == null) return b;
  var c = new Uint8Array(a.length + b.length);
  c.set(a);
  c.set(b, a.length);
  return c;
}
function b(a, b) {
  b = b;
  var c = 0,
    d = 1,
    e;
  do {
    if (b === a.length) return null;
    e = a[b++];
    c += (e & 127) * d;
    d *= 128;
  } while ((e & 128) !== 0);
  return {
    offset: b,
    value: c,
  };
}
function c(a) {
  a = a;
  var b = new Array(1);
  for (var c = 0; c < 4; c++) {
    var d = a % 128;
    a >>= 7;
    if (a > 0) b[c] = d | 128;
    else {
      b[c] = d;
      break;
    }
  }
  return b;
}
function h(a, b, c) {
  c = c;
  b[c++] = a >> 8;
  b[c++] = a % 256;
  return c;
}
function e(a, b) {
  return 256 * a[b] + a[b + 1];
}
function f(a) {
  var b = 0;
  for (var c = 0, d = a.length; c < d; c++) {
    var e = a.charCodeAt(c);
    e < 128 ? (b += 1) : e < 2048 ? (b += 2) : e >= 55296 && e <= 56319 ? ((b += 4), c++) : (b += 3);
  }
  return b;
}
function i(a, b, c, d) {
  d = h(b, c, d);
  j(a, c, d);
  return d + b;
}
function j(a, b, c) {
  c = c;
  for (var d = 0, e = a.length; d < e; d++) {
    var f = a.charCodeAt(d);
    f < 128
      ? (b[c++] = f)
      : f < 2048
      ? ((b[c++] = 192 | (f >> 6)), (b[c++] = 128 | (f & 63)))
      : f < 55296 || f >= 57344
      ? ((b[c++] = 224 | (f >> 12)), (b[c++] = 128 | ((f >> 6) & 63)), (b[c++] = 128 | (f & 63)))
      : ((f = 65536 + (((f & 1023) << 10) | (a.charCodeAt(++d) & 1023))),
        (b[c++] = 240 | (f >> 18)),
        (b[c++] = 128 | ((f >> 12) & 63)),
        (b[c++] = 128 | ((f >> 6) & 63)),
        (b[c++] = 128 | (f & 63)));
  }
}
function k(a, b, c) {
  var d = [],
    e = b,
    f = 0;
  while (e < b + c) {
    var g = a[e++];
    if (g < 128) d[f++] = String.fromCharCode(g);
    else if (g > 191 && g < 224) {
      var h = a[e++];
      d[f++] = String.fromCharCode(((g & 31) << 6) | (h & 63));
    } else if (g > 239 && g < 365) {
      h = a[e++];
      var i = a[e++],
        j = a[e++];
      h = (((g & 7) << 18) | ((h & 63) << 12) | ((i & 63) << 6) | (j & 63)) - 65536;
      d[f++] = String.fromCharCode(55296 + (h >> 10));
      d[f++] = String.fromCharCode(56320 + (h & 1023));
    } else {
      i = a[e++];
      j = a[e++];
      d[f++] = String.fromCharCode(((g & 15) << 12) | ((i & 63) << 6) | (j & 63));
    }
  }
  return d.join('');
}
var l = (function () {
  function a(a, b, c, d) {
    (this.$1 = a), (this.$2 = b), (this.$5 = c), (this.$6 = d), (this.$4 = !1);
  }
  var b = a.prototype;
  b.$7 = function () {
    var a = this;
    this.$4
      ? ((this.$4 = !1),
        this.$5(),
        (this.$3 = setTimeout(function () {
          a.$7();
        }, this.$2() * 1e3)))
      : this.$6();
  };
  b.reset = function () {
    var a = this;
    this.$4 = !0;
    this.$3 && (clearTimeout(this.$3), (this.$3 = null));
    var b = this.$1() * 1e3;
    b > 0 &&
      (this.$3 = setTimeout(function () {
        a.$7();
      }, b));
  };
  b.cancel = function () {
    this.$3 && (clearTimeout(this.$3), (this.$3 = null));
  };
  return a;
})();
g.UTF8Length = f;
g.convertStringToUTF8 = j;
g.concatBuffers = a;
g.decodeMultiByteInt = b;
g.convertUTF8ToString = k;
g.encodeMultiByteInt = c;
g.writeUInt16BE = h;
g.readUInt16BE = e;
g.writeString = i;
g.Pinger = l;
module.exports = g;
