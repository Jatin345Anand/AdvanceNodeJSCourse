const slugify = require('slugify');
const mongoose = require('mongoose');
const validator = require('validator');
const imageSchema = new mongoose.Schema({
    startLocation: { type: Object, required: [true, 'A User must have an startLocation'] },
    ratingAverage: {
        type: Number,
        required: [true, 'A User must have a ratingAverage'],
        default: 4.5,
        min: [1, 'A rating must be above 1'],
        max: [5, 'A rating must be below 5']
    },
    ratingQuantity: { type: Number, required: [true, 'A User must have a ratingQuantity'], default: 0 },
    images: [String],
    startDates: [Date],
    name: {
        type: String,
        required: [true, 'A User must have a name'],
        trim: true,
        maxlength: [40, 'A image must have less or equal then 40 characters'],
        minlength: [10, 'A image must have less or equal then 10 characters'],
        validate: [validator.isAlpha, 'Image name must only contains charectrers']
    },

    slug: { type: String },
    secretImage: { type: Boolean, default: false },
    duration: { type: Number, required: [true, 'A User must have a duration'] },
    maxGroupSize: { type: Number, required: [true, 'A User must have a maxGroupSize'] },
    difficulty: {
        type: String,
        required: [true, 'A User must have a difficulty'],
        enum: {
            values: ['easy', 'difficult', 'medium'],
            message: 'Difficulty is either: easy, medium, difficult'
        }
    },
    guides: [String],
    price: { type: Number, required: [true, 'A User must have a price'] },
    summary: { type: String, required: [true, 'A User must have a summary'], trim: true },
    description: { type: String, trim: true },
    imageCover: { type: String, required: [true, 'A User must have a image cover'] },
    locations: { type: Object, required: [true, 'A User must have an locations'] },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function(val) {
                return val < this.price;
            },
            message: 'Price discount valuse should be correct!'
        }
    },
    createdAt: { type: Date, default: Date.now(), select: false },
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});
imageSchema.virtual('durationWeeks').get(function() {
    return this.duration / 7;
})

// Document Middleware run before .save() and .create()
imageSchema.pre('save', function(next) {
    // console.log(this); this is current define property
    // "slug": "the-sea-explorer",
    // "name": "The Sea Explorer",
    this.slug = slugify(this.name, { lower: true });
    next();
});

// imageSchema.pre('save', function(next) {
//         console.log('will save document');
//         next();
//     })
// imageSchema.pre('save', function(doc, next) {
//     console.log(doc);
//     next();
// })
// QUERY MIDDLEWARE
// imageSchema.pre(/^find/, function(next) {
//     this.find({ secretImage: { $ne: true } })
//     this.start = Date.now();
//     next();
// });
// imageSchema.pre(/^find/, function(docs, next) {
//     console.log(`Query look ${Date.now() - this.start} milliseconds`);
//     console.log(docs);
//     next();
// });
// AGGEGATION MIDDLEWARE
imageSchema.pre('aggregate', function(next) {
    console.log(this.pipeline());
    // this.pipeline.unshift({
    //     $match: {
    //         secretImage: { $ne: true }
    //     }
    // })
    next();
});
const collectionName = 'images';
const Image = mongoose.model('images', imageSchema, collectionName);
module.exports = Image;