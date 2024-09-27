const fs = require('fs');
const path = require('path');

const parsesFile = path.parse(__dirname);
const ourReadStream = fs.createReadStream(`${parsesFile.dir}/bigdata.txt`);
const writeStream = fs.createWriteStream(`${__dirname}/output.txt`);

// method 1
// this in inserting in output file as a small chunk...not in at a time like fs.writeFileSync
ourReadStream.on('data', (chunk) => {
    writeStream.write(chunk);
});
// method 2(alternative way of method 1)
ourReadStream.pipe(writeStream);
