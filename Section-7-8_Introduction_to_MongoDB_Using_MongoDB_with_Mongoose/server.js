const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });
const DB = process.env.DBURL.replace(
    '<PASSWORD>',
    process.env.DBURL_PASSWORD
)
const DB_LOCAL = process.env.DBURL_LOCAL;
const DB_LOCAL_MAIN = process.env.DBURL_LOCAL_MAIN;
mongoose.connect(DB_LOCAL_MAIN, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(con => {
        // console.log(con.connections);
        console.log('DB has been Connected!');
    })
    // const testUser = new User({
    //     id: 2,
    //     name: "Jatin Anand",
    //     username: 'Jatin345Anand',
    //     email: 'javascriptangular36@gmail.com',
    //     address: {
    //         houseNumber: 347,
    //         steetNumber: 00,
    //         mohalleOrArea: 'Bangla Bihar',
    //         village: 'Begmabad',
    //         post: 'Modinagar',
    //         district: 'Ghaziabad',
    //         state: "Uttar Pradesh",
    //         country: 'India'
    //     }
    // });
    // testUser.save().then(doc => {
    //     console.log(doc);
    // }).catch(err => {
    //     console.log('error', err);
    // });
    // console.log(app.get('env'), typeof process.env, Object.keys(process.env));
console.log(process.env.PORT, process.env.USER);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server has been started on ${port}!`);
});