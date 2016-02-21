const Note = require('../models/note');

module.exports = {
    newNote: function(req,res){
        Note.create({body: req.body.body,vocabularies: req.body.vocabularies, tags: req.body.tags})
            .then(function(note){
                res.status(200).json(note).end();
            })
            .catch(function(err){
                res.status(500).json({error: err.message}).end();
            });
    },
    updateNote: function(req,res){
        var id = req.param('id');
        Note.findByIdAndUpdate(id,req.body,{new: true})
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
    }
};
