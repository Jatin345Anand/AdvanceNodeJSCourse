const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
    console.log(`Breed : ${data}`);
    // https://jsonplaceholder.typicode.com/photos
    // https://dog.ceo/api/breed/${data}/images/random
    superagent.get(`https://jsonplaceholder.typicode.com/photos`).end((err, res) => {
        // console.log(res);
        if (err) return console.log(err.message);
        console.log(res.body);
        // console.log(res.body.message);
        fs.writeFile('albums.js', JSON.stringify(res.body), err => {
            console.log('Random album images saved to file!');
        });
    });
});