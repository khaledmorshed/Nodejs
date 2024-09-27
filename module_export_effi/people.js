const people = ['morshed', 'noyon', 'moon'];
const a = 6;

function test() {
    console.log('test');
}

// console.log(module);

// single export
// module.exports = people;

// multiple export
module.exports = {
    people,
    a,
    test,
};

// effi as a encapsulate thing
// (function () {
//     const a = 5;
// })();

// //eache file by default is wrapped in a fucntion like bellow..it is called Moduel Wrapper Functin in node js
// (function(exports, require, module, __filename, __dirname){
// const people = ['morshed', 'noyon', 'moon'];
// const a = 6;

// function test() {
//     console.log('test');
// }

// //console.log(module);
// module.exports = people;
// //by default return module.exporst
//  return moduel.exports;
// });
