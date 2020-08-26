const fs = require('fs');
const Image = require('../models/imageModel');
const APIFeatures = require('../utils/apiFeatures');
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

exports.getAllImages = async(req, res) => {
    try {

        // EXECUTE QUERY 
        const features = new APIFeatures(Image.find(), req.query).filter().sort().limitFields().pagination();
        const images = await features.query;
        // const images = await query;
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
exports.getImagesStats = async(req, res) => {
    try {
        // http://127.0.0.1:3000/api/v1/images/image-stats
        const image = await Image.aggregate([{
                $match: {
                    ratingAverage: {
                        $lte: 4.5
                    }
                }
            },
            {
                $group: {
                    // _id: null,
                    // _id: '$difficulty',
                    // _id: '$ratingAverage',
                    _id: {
                        $toUpper: '$difficulty'
                    },
                    numImage: { $sum: 1 },
                    numRating: { $sum: '$ratingQuantity' },
                    avgRating: { $avg: '$ratingAverage' },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' }
                }
            },
            {
                $sort: {
                    avgPrice: 1
                }
            },
            {
                $match: {
                    _id: {
                        $ne: "EASY"
                    }
                }
            }
        ]);
        return res.status(200).json({
            status: 'success',
            data: {
                image
            }
        });
    } catch (err) {
        return res.status(400).json({
            status: 'fail',
            message: 'A Image could not be stated on Image DB!',
            err: {
                err
            }
        });
    }
}
exports.getMonthlyPlan = async(req, res) => {
    try {
        // http://127.0.0.1:3000/api/v1/images/image-monthy-plan/2021
        const year = req.params.year * 1;
        console.log('year', year);
        const image = await Image.aggregate([{
                $unwind: '$startDates'
            },
            {
                $match: {
                    startDates: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group: {
                    _id: {
                        $month: '$startDates'
                    },
                    numImageStarts: {
                        $sum: 1
                    },
                    images: {
                        $push: '$name'
                    }
                }
            },
            {
                $addFields: {
                    month: "$_id"
                }
            },
            {
                $project: {
                    _id: 0
                }
            },
            {
                $sort: {
                    numImageStarts: 1
                }
            },
            {
                $limit: 12
            }
        ]);
        return res.status(200).json({
            status: 'success',
            data: {
                image
            }
        });

    } catch (err) {
        return res.status(400).json({
            status: 'fail',
            message: 'No found!',
            err: {
                err
            }
        });
    }
}