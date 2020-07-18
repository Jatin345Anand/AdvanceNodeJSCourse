const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    id: { type: Number, required: [true, 'A User must have a id'], unique: true },
    name: { type: String, required: [true, 'A User must have a name'], trim: true },
    username: { type: String, required: [true, 'A User must have a username'] },
    role: { type: String, required: [true, 'A User must have a role'] },
    active: { type: Boolean, required: [true, 'A User must have a active status'] },
    photo: { type: String, required: [true, 'A User must have a photo'] },
    email: { type: String, required: [true, 'A User must have an email'], default: 'jatin345anand@gmail.com' },
    address: { type: Object, required: [true, 'A User must have an address'] }
});
const collectionName = 'users';
const User = mongoose.model('users', userSchema, collectionName);
module.exports = User;