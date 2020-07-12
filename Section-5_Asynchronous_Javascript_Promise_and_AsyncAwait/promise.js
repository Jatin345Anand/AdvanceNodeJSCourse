// import { resolve } from 'url';
// import { rejects } from 'assert';

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
readFilePro(`${__dirname}/dog.txt`)
    .then(data => {
        console.log(`Breed : ${data}`);
        // https://jsonplaceholder.typicode.com/photos
        // https://dog.ceo/api/breed/${data}/images/random
        return superagent.get(`https://jsonplaceholder.typicode.com/photos`);
    })
    .then((res) => {
        console.log(res.body);
        return writeFilePro('albums.js', JSON.stringify(res.body));

    }).then(() => {
        console.log('Random album images saved to file!');
    })
    .catch((err) => {
        console.log(err);
    });

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//     console.log(`Breed : ${data}`);
//     // https://jsonplaceholder.typicode.com/photos
//     // https://dog.ceo/api/breed/${data}/images/random
//     superagent.get(`https://jsonplaceholder.typicode.com/photos`)
//         .then((res) => {
//             // console.log(res);
//             // if (err) return console.log(err.message);
//             console.log(res.body);
//             // console.log(res.body.message);
//             fs.writeFile('albums.js', JSON.stringify(res.body), err => {
//                 if (err) return console.log(err.message);
//                 console.log('Random album images saved to file!');
//             });
//         }).catch((err) => {
//             console.log(err);
//         });
// });