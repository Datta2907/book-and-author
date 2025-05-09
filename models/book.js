const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    pages: { type: Number },
    publishedDate: { type: Date },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' }
});

module.exports = mongoose.model('Book', bookSchema);