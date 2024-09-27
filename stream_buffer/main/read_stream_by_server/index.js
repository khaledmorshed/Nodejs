const http = require('http');

// req = readable stream, res = writable stream
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('<html><head><title>Form</title></head>');
        res.write(
            '<body><form method="post" action="/process"><input name="message" /></form></body>',
        );
        res.end();
    } else if (req.url === '/process' && req.method === 'POST') {
        const body = [];
        // it also stream
        req.on('data', (chunk) => {
            // console.log(chunk.toString());
            body.push(chunk);
        });

        // when all data will be read after that it will call
        req.on('end', () => {
            console.log('finished');
            // collection of body(list of buffer) need to concate
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
        });
        res.write('Thank you for submitting.');
        res.end();
    } else {
        res.write('Not found');
        res.end();
    }
});

server.listen(3000);

console.log('listening on 3000 port');
