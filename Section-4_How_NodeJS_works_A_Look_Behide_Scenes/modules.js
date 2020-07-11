console.log(arguments);
console.log(require('module').wrapper);

const C = require('./test-module-1');
const c = new C();

const { add, multiply } = require('./test-module-2');


console.log(c.add(1, 2));
console.log(add(2, 3));
console.log(multiply(3, 4));
// Catching
require('./test-module-3')();