var assert = require('chai').assert,
    mongoose = require('../app_server/models');

before(function(done){
    mongoose.connect('mongodb://localhost/lillebror',done);
});
beforeEach(function(done){
    mongoose.connection.db.dropDatabase(function(err,result){
        if(err) done(err);
        assert.isTrue(result,'droped database');
        done();
    });
});
