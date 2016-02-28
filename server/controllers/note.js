const _ = require('lodash');
const Note = require('../models/note');
const elasticsearch = require('../elasticsearch/types/note');

module.exports = {
    get(req,res) {
        var id = req.params.id;
        Note.findById(id)
            .then(note => res.status(200).json(note).end())
            .catch(err => res.status(500).json({error: err.message}).end());
    },
    new(req,res) {
        var noteToCreate = _.pick(req.body,['body','vocabularies','tags']);
        Note.create(noteToCreate)
            .then(note => res.status(200).json(note).end())
            .catch(err => res.status(500).json({error: err.message}).end());
    },
    update(req,res) {
        var id = req.params.id;
        var noteToUpdate = _.pick(req.body,['body','vocabularies','tags']);
        Note.findByIdAndUpdate(id,noteToUpdate,{new: true})
            .then(note => res.status(200).json(note).end())
            .catch(err => res.status(500).json({error: err.message}).end());
    },
    delete(req,res) {
        var id = req.params.id;
        Note.findByIdAndRemove(id,req.body)
            .then(note => res.status(200).json(note).end())
            .catch(err => res.status(500).json({error: err.message}).end());
    },
    list(req,res) {
        var options = _.pick(req.query,['sort','direction','limit','range']);
        var date = req.query.date;
        Note.listBy(date,options)
            .then(results => res.status(200).json(results).end())
            .catch(err => res.status(500).json({error: err.message}).end());
    },
    search(req,res) {
        var query = req.query.verb;
        elasticsearch.search(query)
            .then(notes => res.status(200).json(notes).end())
            .catch(err => res.status(500).json({error: err.message}).end());
    }
};
