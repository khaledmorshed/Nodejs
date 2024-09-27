const fs = require('fs');

fs.writeFileSync('my_file.txt', 'Hellow programmers');
fs.appendFileSync('my_file.txt', '. How are you?');

// // synchronus way(bad practice)
// const data = fs.readFileSync('my_file.txt');
// console.log(data.toString());

// async way(best way)
fs.readFile('my_file.txt', (err, data) => {
    console.log(data.toString());
});

console.log('test');
