const mongoose = require(__dirname);
const cacheStore = require('../elasticsearch/types/note');

var noteSchema = new mongoose.Schema({
    body: String,
    vocabularies: [String],
    tags: [String],
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
    reviewedAt: { type:Date, default: Date.now}
});

noteSchema.post('save',function(note){
    cacheStore.upsert(
        note.get('id'),
        note.toObject(),
        function(err,res){
            if(err) console.log('es index error',err);
        });
});

noteSchema.post('findOneAndUpdate',function(note){
    cacheStore.upsert(
        note.get('id'),
        note.toObject(),
        function(err,res){
            if(err) console.log('es index error',err);
        });
});

noteSchema.post('findOneAndRemove',function(note){
    cacheStore.delete(
        note.get('id'),
        function(err,res){
            if(err) console,log('es delete error',err);
        });    
});

module.exports = mongoose.model('Note',noteSchema);
