const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
// console.log(app.get('env'), typeof process.env, Object.keys(process.env));
console.log(process.env.PORT, process.env.USER);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server has been started on ${port}!`);
});