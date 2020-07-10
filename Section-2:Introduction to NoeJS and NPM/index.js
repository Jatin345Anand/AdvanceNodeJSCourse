const http = require('http');
const fs = require('fs');
const url = require('url');
const server = http.createServer((req, res) => {
    const pathName = req.url;
    if (pathName === '/' || pathName === '/overview') {
        res.end("This is first Overview.");
    }
    else if (pathName === '/product') {
        res.end("This is the Product.");
    }
    else if(pathName ==='/api' ){
        fs.readFile(`${__dirname}/json/users.json`,'utf-8',(err,data)=>{
            const usersData = JSON.parse(data);
            console.log(usersData);
            res.writeHead(200, {
                'Content-type': 'application/json'
            });    
            res.end(data);
        })
    }
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end(`<h1>Page not found!</h1>`)
    }
});
server.listen(8000, '127.0.0.1', () => {
    console.log("Server has been started.");
});
