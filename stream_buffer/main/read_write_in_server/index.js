const http = require('http');
const fs = require('fs');
const path = require('path');

// req = readable(data come from client) stream,
// res = writable stream(client as a browser will get resposne)
const server = http.createServer((req, res) => {
    const parsesFile = path.parse(__dirname);
    // read from file
    const readStream = fs.createReadStream(`${parsesFile.dir}/bigdata.txt`, 'utf8');
    // write in server..it(data) will show in localhost:3000
    readStream.pipe(res);
});

server.listen(3000);

console.log('listening on 3000 port');
