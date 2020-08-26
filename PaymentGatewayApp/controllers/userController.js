const fs = require('fs');
const User = require('../models/userModel');
//  Route Handlers.
// const users = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/users.json`));
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
exports.getAllUsers = async(req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({
            status: 'success',
            length: users.length,
            data: {
                requestLocaleTime: req.requestLocaleTime,
                requestTime: req.requestTime,
                users
            }
        });
    } catch (err) {
        return res.status(400).json({
            status: 'fail',
            message: 'A User could not be finded the Users List!',
            err: {
                err
            }
        });
    }
};
exports.getUserbyId = async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        return res.status(200).json({
            status: 'success',
            data: {
                requestLocaleTime: req.requestLocaleTime,
                requestTime: req.requestTime,
                user
            }
        });
    } catch (err) {
        return res.status(400).json({
            status: 'fail',
            message: 'A User could not be finded an User!',
            err: {
                err
            }
        });
    }

}
exports.addUser = async(req, res) => {
    try {
        const newUser = await User.create(req.body);
        return res.status(200).json({
            status: 'success',
            data: {
                user: newUser
            }
        });
    } catch (err) {
        return res.status(400).json({
            status: 'fail',
            message: 'A User could not be created!',
            err: {
                err
            }
        });
    }
}
exports.updateAUses = async(req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        return res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    } catch (err) {
        return res.status(400).json({
            status: 'fail',
            message: 'A User could not be updated an User!',
            err: {
                err
            }
        });
    }
}
exports.deleteUser = async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    } catch (err) {
        return res.status(400).json({
            status: 'fail',
            message: 'A User could not be deleted an User!',
            err: {
                err
            }
        });
    }
}