let a, b, c, d, e, f, g;

function a(a, b) {
  return h(a, 'sid', b.toString());
}
function b(a, b) {
  var c = a;
  b.forEach(function (a, b) {
    c = h(c, b, a);
  });
  return c;
}
function h(a, b, c) {
  if (a.indexOf('?') > 0) return a + '&' + b + '=' + c;
  else return a + '?' + b + '=' + c;
}
function c() {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}
function i(a, b, c) {
  var e = arguments.length > 1 ? a.then(b, c) : a;
  e.then(null, function (a) {
    setTimeout(function () {
      if (a instanceof Error) throw a;
      else throw new Error('promiseDone');
    }, 0);
  });
}
function e(a, b, c, e) {
  var f = !1;
  setTimeout(function () {
    f || ((f = !0), c(new Error('promise timeout')));
  }, e);
  i(
    a,
    function (a) {
      f || ((f = !0), b(a));
    },
    function (a) {
      f || ((f = !0), c(a));
    }
  );
}
function f(a) {
  for (var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1; d < b; d++) c[d - 1] = arguments[d];
  var e = 0;
  return a.replace(/%s/g, function () {
    return String(c[e++]);
  });
}
g.endpointWithSessionId = a;
g.endpointWithExtraParameters = b;
g.endpointWithExtraParameter = h;
g.generateSessionId = c;
g.promiseDone = i;
g.promiseDoneWithTimeout = e;
g.sprintf = f;
module.exports = g;
