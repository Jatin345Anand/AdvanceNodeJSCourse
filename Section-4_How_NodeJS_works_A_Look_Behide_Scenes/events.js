const EventEmitter = require('events');
const myEmitter = new EventEmitter();
const http = require('http');
class Sales extends EventEmitter {
    constructor() {
        super();
    }
}
myEmitter.on('newSale', () => {
    console.log('There was a new sale!.');
});
myEmitter.on('newSale', () => {
    console.log('Costumer name: Jonus');
});
myEmitter.on('newSale', stock => {
    console.log(`There are new ${stock} items left in stock.`)
});
myEmitter.emit('newSale', 9);

//////////////
const server = http.createServer();
server.on('request', (req, res) => {
    console.log('Request recieved!');
    res.end("Another request")
});

server.on('request', (req, res) => {
    console.log('Request recieved!');
    res.end("Another request")
});
server.on('close', (req, res) => {
    console.log('Server closed!');
});
server.listen(8000, '127.0.0.1', () => {
    console.log(`Waiting for :) request...`)
});