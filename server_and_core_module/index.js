const _ = require('lodash');
const people = require('./path_basic');

console.log(people.people);
console.log(people.a);
console.log(people.test);
people.test();

console.log(_.last(people.people));
