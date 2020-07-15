const express = require('express');
const app = express();
const fs = require('fs');
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
// 1. add middlewares
if (process.env.NODE_ENV == 'developement') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('tiny'));
}
app.use(express.json());
// http://localhost:3000/img/Screenshot%202020-07-11%20at%206.06.11%20PM.png
// http://127.0.0.1:3000/img/Screenshot%202020-07-15%20at%206.13.23%20PM.png
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
    console.log('Hello Jatin Anand! This is the best Middleware Ever.');
    next();
});
app.use((req, res, next) => {
    req.requestLocaleTime = Date.now().toLocaleString();
    req.requestTime = new Date().toISOString();
    next();
});


// 2. Routes 
app.use('/api/v1/users', userRouter);


// app.get('/api/v1/users', getAllUsers);
// app.get('/api/v1/users/:id', getUserbyId);
// app.post('/api/v1/users', addUser);
// app.patch('/api/v1/users/:id', updateAUses);
// app.delete('/api/v1/users/:id', deleteUser); 

// 3. Restart the Server.
module.exports = app;