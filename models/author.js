const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    birthdate: { type: Date },
    nationality: { type: String }
});

module.exports = mongoose.model('Author', authorSchema);