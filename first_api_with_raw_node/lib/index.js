// dependcencies
const http = require('http');
const { handleReqRes } = require('./helpers/handle_req_res');
const environments = require('./helpers/environments');
const data = require('./data_lib/data');

// app object - module scaffolding
const app = {};

// insert data by creating file
data.create('info', 'country_info', { name: 'Saudi Arabia', language: 'Arabic' }, (err) => {
    console.log(err);
});

// // get data
// data.read('info', 'country_info', (err, callbackData) => {
//     console.log(err, callbackData);
// });

// // update data
// data.update('info', 'country_info', { name: 'Bangldesh', language: 'Bangla' }, (err) => {
//     console.log(err);
// });

// delte file data
// data.delete('info', 'country_info', (err) => {
//     console.log(err);
// });

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(environments.port, () => {
        console.log(`listening to port ${environments.port}`);
    });
};

// handle Request Response
app.handleReqRes = handleReqRes;

// start server
app.createServer();

// to install nodemon(yarn global add nodemon)
