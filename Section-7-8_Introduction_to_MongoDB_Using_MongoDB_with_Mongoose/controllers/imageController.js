const fs = require('fs');
const Image = require('../models/imageModel');
//  Route Handlers.
// const images = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/images.json`));
exports.checkID = (req, res, next, val) => {
    console.log(`Id is ${val}`);
    next();
};
exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.address) {
        return res.status(404).json({
            status: 'fail',
            msg: 'Missing Name and Address!'
        });
    }
    next();
}
exports.aliasTopImages = (req, res, next) => {
    // http://127.0.0.1:3000/api/v1/images/top-5-cheap
    req.query.limit = '5';
    req.query.sort = 'ratingAverage,-price';
    req.query.fields = 'name,ratingAverage,guides,price,difficulty';
    next();
}
class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filter() {
        console.log(req.query);
        const queryObj = {...this.queryString };
        // 1. FILTERING
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);
        const queryStr = JSON.stringify(queryObj);
        console.log('queryStr', queryStr);
        // 2. Advance Filtering  
        let replacedQueryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        let finalQueryStr = JSON.parse(replacedQueryStr);
        this.query = this.query.find(finalQueryStr);
        return this;
    }
    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
            // console.log('in sort', query);
        } else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }
    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }
    }
    pagination() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;
        // page=3&limit=10 1-10, page 1, 11-20, page 2, 21-30 page 3
        this.query = this.query.skip(skip).limit(limit);
        // if (req.query.page) {
        //     const numImages = await Image.countDocuments();
        //     console.log('num images', numImages, skip);
        //     if (skip >= numImages) {
        //         throw new Error('This page does not exist');
        //     }
        // }
        return this;
    }
}
exports.getAllImages = async(req, res) => {
    try {
        // COMPLETE URL
        // http://127.0.0.1:3000/api/v1/images
        // http://127.0.0.1:3000/api/v1/images?difficulty=easy&page=2&sort=1&limit=10
        // http://127.0.0.1:3000/api/v1/images?difficulty=difficult&page=2&sort=1&limit=10
        // http://127.0.0.1:3000/api/v1/images?duration[gte]=5&difficulty=easy&price[lte]=500
        // http://127.0.0.1:3000/api/v1/images?sort=-price,-ratingAverage
        // http://127.0.0.1:3000/api/v1/images?fields=name,ratingAverage,guides,price,difficulty
        // http://127.0.0.1:3000/api/v1/images?page=2&limit=5
        // http://127.0.0.1:3000/api/v1/images?page=1&limit=10
        // http://127.0.0.1:3000/api/v1/images?limit=10&sort=ratingAverage,-price
        // Build Query
        // console.log(req.query);
        const queryObj = {...req.query };
        // 1. FILTERING
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);
        const queryStr = JSON.stringify(queryObj);
        console.log('queryStr', queryStr);
        // 2. Advance Filtering 
        console.log(queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`));
        let replacedQueryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        let finalQueryStr = JSON.parse(replacedQueryStr);
        let query = Image.find(finalQueryStr);
        // { difficulty: 'difficult', duration: { gte: '7' } }
        // 3. Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
            // console.log('in sort', query);
        } else {
            query = query.sort('-createdAt');
        }
        // 4. Field Limiting
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        } else {
            query = query.select('-__v');
        }
        // 5. Pagination
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 100;
        const skip = (page - 1) * limit;
        // page=3&limit=10 1-10, page 1, 11-20, page 2, 21-30 page 3
        query = query.skip(skip).limit(limit);
        if (req.query.page) {
            const numImages = await Image.countDocuments();
            console.log('num images', numImages, skip);
            if (skip >= numImages) {
                throw new Error('This page does not exist');
            }
        }
        // EXECUTE QUERY 
        // const features = new APIFeatures(Image.find(), req.query).filter().sort().limitFields();
        // const images = await features.query;
        const images = await query;
        // const images = await Image.find({});
        // const images = await Image.find({ duration: 9, difficulty: 'easy' });
        // const images = await Image.find().where('duration').equals('7');
        return res.status(200).json({
            status: 'success',
            length: images.length,
            data: {
                requestLocaleTime: req.requestLocaleTime,
                requestTime: req.requestTime,
                images
            }
        });
    } catch (err) {
        return res.status(400).json({
            status: 'fail',
            message: 'A Image could not be finded the Users List!',
            err: {
                err
            }
        });
    }
};
exports.getImagebyId = async(req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        return res.status(200).json({
            status: 'success',
            data: {
                requestLocaleTime: req.requestLocaleTime,
                requestTime: req.requestTime,
                image
            }
        });
    } catch (err) {
        return res.status(400).json({
            status: 'fail',
            message: 'A Image could not be finded an Image!',
            err: {
                err
            }
        });
    }

}
exports.addImage = async(req, res) => {
    try {
        console.log(req.query);
        const newUser = await Image.create(req.body);
        return res.status(200).json({
            status: 'success',
            data: {
                image: newUser
            }
        });
    } catch (err) {
        return res.status(400).json({
            status: 'fail',
            message: 'A Image could not be created!',
            err: {
                err
            }
        });
    }
}
exports.updateAImage = async(req, res) => {
    try {
        const image = await Image.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        return res.status(200).json({
            status: 'success',
            data: {
                image
            }
        });
    } catch (err) {
        return res.status(400).json({
            status: 'fail',
            message: 'A Image could not be updated an Image!',
            err: {
                err
            }
        });
    }
}
exports.deleteImage = async(req, res) => {
    try {
        const image = await Image.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            status: 'success',
            data: {
                image
            }
        });
    } catch (err) {
        return res.status(400).json({
            status: 'fail',
            message: 'A Image could not be deleted an Image!',
            err: {
                err
            }
        });
    }
}