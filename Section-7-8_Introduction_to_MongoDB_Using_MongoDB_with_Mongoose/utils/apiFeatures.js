class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filter() {
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
        return this;
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
module.exports = APIFeatures;