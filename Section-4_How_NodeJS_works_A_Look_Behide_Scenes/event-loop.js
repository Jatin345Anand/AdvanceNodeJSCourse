const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 4;
setTimeout(() => console.log('Time 1 finished'), 0);
setImmediate(() => console.log('Immediate 1 finished'));

fs.readFile('JatinTextWranglerDoubts.txt', () => {
    console.log('I/O finifhed');
    console.log('----------------');
    setTimeout(() => console.log('Time 1 2 sec finished'), 2000);
    setTimeout(() => console.log('Time 1 3 sec finished'), 3000);
    setImmediate(() => console.log('Immediate 1 finished'));
    process.nextTick(() => { console.log('Process.nextTick()') });
    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'Password encrypted');
    });
    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'Password encrypted');
    });
    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'Password encrypted');
    });
    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'Password encrypted');
    });
});

console.log("Hello from the top-lovel code");