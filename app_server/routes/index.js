const express = require('express');
const Note = require('../controllers/note');

var apiRoutes = function(){
    var router = express.Router();

    router.post('/notes', Note.newNote);
    
    return router;
};

module.exports = apiRoutes;
