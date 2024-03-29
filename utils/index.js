require('./colors');
const fs = require('fs');
const path = require('path');

const colorStatus = {
  error: {
    system: 'blue',
    msg: 'red',
  },
  warn: {
    system: 'magenta',
    msg: 'yellow',
  },
  log: {
    system: 'green',
    msg: 'white',
  },
};
global.getType = (a) => Object.prototype.toString.call(a).slice(8, -1);
global.delay = (a) => new Promise((resolve) => setTimeout(resolve, a));
global.objectFilter = (obj, predicate) =>
  Object.keys(obj)
    .filter((key) => predicate(obj[key]))
    .reduce((res, key) => ((res[key] = obj[key]), res), {});

['log', 'error', 'warn'].forEach((a) => {
  global[a.toLocaleUpperCase()] = (msg, obj) => {
    if (typeof msg != 'string') return console.log(msg);
    getType(obj) == 'String' && ((a = obj), (obj = ''));
    !obj && (obj = '');
    var color = colorStatus[a];
    if (!color) color = colorStatus['log'];
    return console.log(` [ ${'Hệ thống'[color.system]} ] ►►►► ` + msg[color.msg], obj);
  };
});

global.FILE = {
  saveFile: (name, data, dir, hasName) => {
    if (dir == null) dir = `./`;
    fs.writeFileSync(path.join(process.cwd(), hasName ? dir : `${dir}${name}`), JSON.stringify(data, null, 4), {
      mode: 0o666,
    });
  },
  createFolder: (nameFolder, dir, hasName) => {
    if (dir == null) dir = `./`;
    fs.mkdirSync(path.join(process.cwd(), hasName ? dir : `${dir}${nameFolder}`), { mode: 0o777, recursive: true });
  },
  isExist: (dir) => fs.existsSync(path.join(process.cwd(), dir)),
};
