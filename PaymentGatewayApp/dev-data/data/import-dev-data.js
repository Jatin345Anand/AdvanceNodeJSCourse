const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './../config.env' });
const Image = require('../../models/imageModel');
// const DB = process.env.DBURL.replace(
//     '<PASSWORD>',
//     process.env.DBURL_PASSWORD
// )
const DB_LOCAL = process.env.DBURL_LOCAL;
const DB_LOCAL_MAIN = process.env.DBURL_LOCAL_MAIN || 'mongodb://localhost:27017/advanceNodeJSdb';
mongoose.connect(DB_LOCAL_MAIN, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(con => {
        // console.log(con.connections);
        console.log('DB has been Connected!');
    })
    // READ JSON FILE
const images = JSON.parse(fs.readFileSync(`${__dirname}/../images.json`, 'utf-8'));
// IMPORT DATA INTO DB
const importData = async() => {
    try {
        await Image.create(images);
        console.log('Data has been created successfully!');
    } catch (err) {
        console.log(err);
    }
    process.exit();
}

// DELETE ALL DATA FROM DB
const deleteData = async() => {
    try {
        await Image.deleteMany();
        console.log('Data has been deleted successfully!');
    } catch (err) {
        console.log(err);
    }
    process.exit();
}
if (process.argv[2] === '--import') {
    importData();
}
if (process.argv[2] === '--delete') {
    deleteData();
}
console.log(process.argv);