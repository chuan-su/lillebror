const expect = require('chai').expect,
      request = require('supertest'),
      app = require('../../app_server');

require('../spec_helper');

describe('Note REST API test',function(){
    it('create a new note',function(done){
        request(app)
            .post('/api/notes')
            .send({
                body:"test test"
            })
            .expect(200)
            .end(done);
    });
});
