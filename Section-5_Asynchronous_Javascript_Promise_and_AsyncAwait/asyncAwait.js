const fs = require('fs');
const superagent = require('superagent');
const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('I could not find that file.');
            resolve(data);
        })
    });
}
const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject('I could not find that file.');
            resolve('success');
        });
    });
};
// readFilePro(`${__dirname}/dog.txt`)
//     .then(data => {
//         console.log(`Breed : ${data}`);
//         // https://jsonplaceholder.typicode.com/photos
//         // https://dog.ceo/api/breed/${data}/images/random
//         return superagent.get(`https://jsonplaceholder.typicode.com/photos`);
//     })
//     .then((res) => {
//         console.log(res.body);
//         return writeFilePro('userss.js', JSON.stringify(res.body));

//     })
//     .then(() => {
//         console.log('Random users images saved to file!');
//     })
//     .catch((err) => {
//         console.log(err);
//     });

const getuserss = async() => {
        try {
            const data = await readFilePro(`${__dirname}/dog.txt`);
            console.log('users Data ', data);
            // const res = await superagent.get(`https://jsonplaceholder.typicode.com/users`);
            // console.log('response', res);
            // Waiting for multiple promises simultaneously
            const res1Pro = superagent.get(`https://jsonplaceholder.typicode.com/users`);
            const res2Pro = superagent.get(`https://jsonplaceholder.typicode.com/users`);
            const res3Pro = superagent.get(`https://jsonplaceholder.typicode.com/users`);
            const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
            console.log('all Response ', all);
            console.log('all Response ', typeof all);
            const users = all.map((u) => u.body);
            console.log('users data', users);
            await writeFilePro('users.json', JSON.stringify(users));
            console.log('Random users images saved to file!');
        } catch (err) {
            console.log('err', err);
            throw err;
        }
        return '2: READY';
    }
    (async() => {
        try {
            console.log('1: will get users');
            const x = await getuserss();
            console.log(x);
            console.log('2: Done getting alumbs');
        } catch (err) {
            console.log('err in whole function', err);
        }
    })();
console.log('1: will get users');
// const x = getuserss();
// console.log(x);
// getuserss().then(x => {
//     console.log(x);
//     console.log('2: Done getting alumbs');

// }).catch((err) => {
//     console.log('err in whole function', err);
// });
// console.log('2: Done getting alumbs');