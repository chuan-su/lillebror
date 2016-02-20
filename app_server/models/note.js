const mongoose = require('mongoose');

var noteSchema = new mongoose.Schema({
    body: String,
    vocabularies: [String],
    tags: [String],
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
    reviewedAt: { type:Date, default: Date.now}
});

module.exports = mongoose.model('Note',noteSchema);
