const mongoose = require(__dirname);
const cacheStore = require('../elasticsearch/types/note');

var noteSchema = new mongoose.Schema({
    body: String,
    vocabularies: [String],
    tags: [String],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    reviewedAt: {type: Date, default: Date.now}
});

noteSchema.post('save',note => {
    cacheStore.upsert(
        note.get('id'),
        note.toObject(),
        (err,res) => {
            if(err) console.log('es index error',err);
        });
});

noteSchema.post('findOneAndUpdate',note => {
    cacheStore.upsert(
        note.get('id'),
        note.toObject(),
        (err,res) => {
            if(err) console.log('es index error',err);
        });
});

noteSchema.post('findOneAndRemove',note => {
    cacheStore.delete(
        note.get('id'),
        (err,res) => {
            if(err) console,log('es delete error',err);
        });    
});

module.exports = mongoose.model('Note',noteSchema);
