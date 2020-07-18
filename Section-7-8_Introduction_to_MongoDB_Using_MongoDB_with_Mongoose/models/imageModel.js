const mongoose = require('mongoose');
const imageSchema = new mongoose.Schema({
    startLocation: { type: Object, required: [true, 'A User must have an startLocation'] },
    ratingAverage: { type: Number, required: [true, 'A User must have a ratingAverage'], default: 4.5 },
    ratingQuantity: { type: Number, required: [true, 'A User must have a ratingQuantity'], default: 0 },
    images: [String],
    startDates: [Date],
    name: { type: String, required: [true, 'A User must have a name'], trim: true },
    duration: { type: Number, required: [true, 'A User must have a duration'] },
    maxGroupSize: { type: Number, required: [true, 'A User must have a maxGroupSize'] },
    difficulty: { type: String, required: [true, 'A User must have a difficulty'] },
    guides: [String],
    price: { type: Number, required: [true, 'A User must have a price'] },
    summary: { type: String, required: [true, 'A User must have a summary'], trim: true },
    description: { type: String, trim: true },
    imageCover: { type: String, required: [true, 'A User must have a image cover'] },
    locations: { type: Object, required: [true, 'A User must have an locations'] },
    priceDiscount: { type: Number, required: [true, 'A User must have an price Discount'], default: 40 },
    createdAt: { type: Date, default: Date.now(), select: false }
});
const collectionName = 'images';
const Image = mongoose.model('images', imageSchema, collectionName);
module.exports = Image;