const _ = require('lodash');
const Note = require('../models/note');
const elasticsearch = require('../elasticsearch/types/note');

module.exports = {
    newNote(req,res) {
        var noteToCreate = _.pick(req.body,['body','vocabularies','tags']);
        Note.create(noteToCreate)
            .then(note => res.status(200).json(note).end())
            .catch(err => res.status(500).json({error: err.message}).end());
    },
    updateNote(req,res) {
        var id = req.param('id');
        var noteToUpdate = _.pick(req.body,['body','vocabularies','tags']);
        Note.findByIdAndUpdate(id,noteToUpdate,{new: true})
            .then(note => res.status(200).json(note).end())
            .catch(err => res.status(500).json({error: err.message}).end());
    },
    deleteNote(req,res) {
        var id = req.param('id');
        Note.findByIdAndRemove(id,req.body)
            .then(note => res.status(200).json(note).end())
            .catch(err => res.status(500).json({error: err.message}).end());
    },
    searchNote(req,res) {
        var query = req.param('verb');
        elasticsearch.search(query)
            .then(notes => res.status(200).json(notes).end())
            .catch(err => res.status(500).json({error: err.message}).end());
    }
};
