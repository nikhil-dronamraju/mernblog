const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {type: String, required: true},
    entry: {type: String, required: true},
    author: {type: String, required: true},
}, {timestamps: true});

const Blogs = mongoose.model('Blogs', blogSchema);

module.exports = Blogs;