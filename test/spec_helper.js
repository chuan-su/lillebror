var assert = require('chai').assert,
    elasticsearch = require('../app_server/elasticsearch');
    mongoose = require('../app_server/models');

before(function(done){
    mongoose.connect('mongodb://localhost/lillebror',done);
});

beforeEach(function(done){
    elasticsearch.initIndex()
        .then(function(res){
            assert.isTrue(res.acknowledged,'created elasticsearch index');
            return elasticsearch.initNoteTypeMapping();
        })
        .then(function(res){
            assert.isTrue(res.acknowledged,'initialized elasticsearch type notes');
            return mongoose.connection.db.dropDatabase();
        })
        .then(function(result){
            assert.isTrue(result,'droped database');
            done();
        })
        .catch(done);
});
