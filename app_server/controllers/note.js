const _ = require('lodash');
const Note = require('../models/note');
const elasticsearch = require('../elasticsearch/types/note');

module.exports = {
    newNote: function(req,res){
        var noteToCreate = _.pick(req.body,['body','vocabularies','tags']);
        Note.create(noteToCreate)
            .then(function(note){
                res.status(200).json(note).end();
            })
            .catch(function(err){
                res.status(500).json({error: err.message}).end();
            });
    },
    updateNote: function(req,res){
        var id = req.param('id');
        var noteToUpdate = _.pick(req.body,['body','vocabularies','tags']);
        Note.findByIdAndUpdate(id,noteToUpdate,{new: true})
            .then(function(note){
                res.status(200).json(note).end();
            })
            .catch(function(err){
                res.status(500).json({error: err.message}).end();
            });
    },
    deleteNote: function(req,res){
        var id = req.param('id');
        Note.findByIdAndRemove(id,req.body)
            .then(function(note){
                res.status(200).json(note).end();
            })
            .catch(function(err){
                res.status(500).json({error: err.message}).end();
            });
    },
    searchNote: function(req,res){
        var query = req.param('verb');
        elasticsearch.search(query)
            .then(function(notes){
                res.status(200).json(notes).end();
            })
            .catch(function(err){
                res.status(500).json({error: err.message}).end();
            });
    }
};
