"use strict";

const express = require('express');
const Note = require('../controllers/note');

var apiRoutes = () => {
    let router = express.Router();

    router.get('/notes/:id',Note.get);
    router.post('/notes', Note.new);
    router.put('/notes/:id',Note.update);
    router.delete('/notes/:id',Note.delete);
    router.get('/notes',Note.list);
    router.get('/notes/_search',Note.search);
    
    return router;
};

module.exports = apiRoutes;

