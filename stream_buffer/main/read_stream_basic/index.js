const fs = require('fs');
const path = require('path');

/// /way 1
// const parsesFile = path.parse(__dirname);
// const ourReadStream = fs.createReadStream(`${parsesFile.dir}/bigdata.txt`)

// ourReadStream.on('data', (chunk) => {
//     console.log(chunk.toString());
// });

/// /way 2
const parsesFile = path.parse(__dirname);
const ourReadStream = fs.createReadStream(`${parsesFile.dir}/bigdata.txt`, 'utf8');

ourReadStream.on('data', (chunk) => {
    console.log(chunk);
});
