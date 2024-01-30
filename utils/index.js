require("./colors");
const readline = require("readline");

const colorStatus = {
  error: {
    system: "blue",
    msg: "red",
  },
  warn: {
    system: "magenta",
    msg: "yellow",
  },
  nor: {
    system: "green",
    msg: "white",
  },
};
global.getType = (a) => Object.prototype.toString.call(a).slice(8, -1);
global.delay = (a) => new Promise((resolve) => setTimeout(resolve, a));
global.objectFilter = (obj, predicate) =>
  Object.keys(obj)
    .filter((key) => predicate(obj[key]))
    .reduce((res, key) => ((res[key] = obj[key]), res), {});
global.LOG = (msg, obj, status = "nor") => {
  if (typeof msg != "string") return console.log(msg);
  getType(obj) == "String" && ((status = obj), (obj = ""));
  !obj && (obj = "");
  var color = colorStatus[status];
  if (!color) color = colorStatus["nor"];
  return console.log(` [ ${"Hệ thống"[color.system]} ] ►►►► ` + msg[color.msg], obj);
};
