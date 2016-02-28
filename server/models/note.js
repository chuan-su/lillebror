'use strict';
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

noteSchema.statics.listBy = (date,options) => {
    date = date || new Date();
    let limit = options.limit || 20,
        range = options.range || 0,
        sort = options.sort || 'updatedAt',
        direction = options.direction || -1;
    // this is binded to lexical scope in es6 arrow methods
    // so use mongoose.models.Note to retrieve Model Query methods.
    return mongoose.models.Note.find({updatedAt:{$lt:date}})
        .sort({updatedAt: direction})
        .skip(range*limit)
        .limit(limit)
        .lean()
        .exec()
        .then(results => results)
        .catch(error => {throw error;});
};
module.exports = mongoose.model('Note',noteSchema);
