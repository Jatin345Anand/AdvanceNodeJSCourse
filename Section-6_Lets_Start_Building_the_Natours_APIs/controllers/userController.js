const fs = require('fs');
//  Route Handlers.
const users = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/users.json`));
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
exports.getAllUsers = (req, res) => {
    // return res.status(500).json({
    //     status: 'success',
    //     message: 'This route is not defined yet.'
    // });
    return res.status(200).json({
        status: 'success',
        length: users.length,
        data: {
            requestLocaleTime: req.requestLocaleTime,
            requestTime: req.requestTime,
            users
        }
    });
};
exports.getUserbyId = (req, res) => {
    console.log(req.params);
    let id = req.params.id * 1;
    if (id > users.length) {
        return res.status(404).json({
            status: 'fail',
            msg: 'Invalid ID!'
        });
    }
    const user = users.find((i) => i.id === id);
    return res.status(200).json({
        status: 'success',
        length: users.length,
        data: {
            users: user
        }
    });
}
exports.addUser = (req, res) => {
    console.log(req.body);
    const newUserId = users[users.length - 1].id + 1;
    const newUser = Object.assign({ id: newUserId }, req.body);
    users.push(newUser);
    fs.writeFile(`${__dirname}/../dev-data/users.json`, JSON.stringify(users), err => {
        if (err) {
            res.status(404).json({
                status: 'fail',
                err: {
                    err: err
                }
            });
        }
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        });
    });
}
exports.updateAUses = (req, res) => {
    let id = req.params.id * 1;
    if (id > users.length) {
        return res.status(404).json({
            status: 'fail',
            msg: 'Invalid ID!'
        });
    }
    return res.status(200).json({
        status: 'success',
        data: {
            user: `<Updated User here...>`
        }
    });
}
exports.deleteUser = (req, res) => {
    let id = req.params.id * 1;
    if (id > users.length) {
        return res.status(404).json({
            status: 'fail',
            msg: 'Invalid ID!'
        });
    }
    return res.status(204).json({
        status: 'success',
        data: null
    });
}