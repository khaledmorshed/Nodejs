const path = require('path');
const os = require('os');

const myPath = '/home/morshed/Documents/Nodejs/server_and_core_module/path_basic.js';
// console.log(path.basename(myPath));
// console.log(path.extname(myPath));
// console.log(path.parse(myPath));

console.log(os.platform());
console.log(os.homedir());
console.log(os.freemem());
