const http = require('http');
const fs = require('fs');
const url = require('url');
const slugify = require('slugify');
const data = fs.readFileSync(`${__dirname}/dev-data/albums.json`, 'utf-8');
const dataObj = JSON.parse(data);
const slugs = dataObj.map((el) => slugify(el.title, {
    replacement: '-', // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: false, // strip special characters except replacement, defaults to `false`
    locale: 'vi' // language code of the locale to use 
}));
console.log(slugs);
const server = http.createServer((req, res) => {
    const pathName = req.url;
    if (pathName === '/' || pathName === '/overview') {
        res.end("This is first Overview.");
    } else if (pathName === '/product') {
        res.end("This is the Product.");
    } else if (pathName === '/api') {
        fs.readFile(`${__dirname}/dev-data/albums.json`, 'utf-8', (err, data) => {
            const usersData = JSON.parse(data);
            // console.log(usersData);
            res.writeHead(200, {
                'Content-type': "application/json"
            });
            res.end(data);
        })
    } else {
        res.writeHead(404, {
            'Content-type': "text/html",
            'my-own-header': 'hello-world'
        });
        res.end(`<h1>Page not found!</h1>`)
    }
});
server.listen(8000, '127.0.0.1', () => {
    console.log("Server has been started.");
});