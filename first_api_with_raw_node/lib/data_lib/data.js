// dependencies
const fs = require('fs');
const path = require('path');

// module scaffolding
const lib = {};

// Set base directory to '.data' outside the 'lib' folder
// lib.baseDir = path.join(__dirname, '../.data/');
lib.baseDir = path.join(process.cwd(), '.data/');
console.log(`lib.baseDir: ${lib.baseDir}`);

// write data to file
// wx = in which mood i want to open file
// if fails it give error and give fileDescriptor as a success
// dir = in which folder, file = pass the filename, data = pass the data
lib.create = (dir, file, data, callback) => {
    // Construct the full file path with the specified directory and filename
    const filePath = path.join(lib.baseDir, dir, `${file}.json`);

    // Ensure directory exists
    fs.mkdir(path.join(lib.baseDir, dir), { recursive: true }, (err0) => {
        if (!err0 || (err0 && err0.code === 'EEXIST')) {
            fs.open(filePath, 'wx', (err1, fileDescriptor) => {
                // if not error and have fileDescriptor
                if (!err1 && fileDescriptor) {
                    // covert data to string
                    const stringData = JSON.stringify(data);

                    // write data to file then close it
                    // pass fileDescriptor as reference for which file for writing
                    fs.writeFile(fileDescriptor, stringData, (err2) => {
                        if (!err2) {
                            // colse the file if succeeded
                            fs.close(fileDescriptor, (err3) => {
                                if (!err3) {
                                    callback(false);
                                } else {
                                    callback(`err3: ${err3}`);
                                }
                            });
                        } else {
                            callback(`err2: ${err2}`);
                        }
                    });
                } else {
                    callback(`err1: ${err1}`);
                }
            });
        } else {
            callback(`Error creating directory: ${err0}`);
        }
    });
    //     // if not error and have fileDescriptor
    //     if (!err1 && fileDescriptor) {
    //         // covert data to string
    //         const stringData = JSON.stringify(data);

    //         // write data to file then close it
    //         // pass fileDescriptor as reference for which file for writing
    //         fs.writeFile(fileDescriptor, stringData, (err2) => {
    //             if (!err2) {
    //                 // colse the file if succeeded
    //                 fs.close(fileDescriptor, (err3) => {
    //                     if (!err3) {
    //                         callback(false);
    //                     } else {
    //                         callback(`err3: ${err3}`);
    //                     }
    //                 });
    //             } else {
    //                 callback(`err2: ${err2}`);
    //             }
    //         });
    //     } else {
    //         callback(`err1: ${err1}`);
    //     }
    // });
};

// epxort module
module.exports = lib;
