"use strict";

const express = require('express');
const Note = require('../controllers/note');

var apiRoutes = () => {
    let router = express.Router();

    router.post('/notes', Note.newNote);
    router.put('/notes/:id',Note.updateNote);
    router.delete('/notes/:id',Note.deleteNote);
    router.get('/notes/_search',Note.searchNote);
    
    return router;
};

module.exports = apiRoutes;
