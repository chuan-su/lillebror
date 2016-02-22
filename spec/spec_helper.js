var assert = require('chai').assert,
    elasticsearch = require('../app_server/elasticsearch');
    mongoose = require('../app_server/models');

before(done => {
    mongoose.connect('mongodb://localhost/lillebror',done);
});

beforeEach(done => {
    elasticsearch.initIndex()
        .then(res => {
            assert.isTrue(res.acknowledged,'created elasticsearch index');
            return elasticsearch.initNoteTypeMapping();
        })
        .then(res => {
            assert.isTrue(res.acknowledged,'initialized elasticsearch type notes');
            return mongoose.connection.db.dropDatabase();
        })
        .then(result => {
            assert.isTrue(result,'droped database');
            done();
        })
        .catch(done);
});
