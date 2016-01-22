const express = require('express');
      

var apiRoutes = function(){
    var router = express.Router();

    router.get('/search',function(req,res){
        res.status(200).json('it works').end;
    });
    
    return router;
};

module.exports = apiRoutes;
