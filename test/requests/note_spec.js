const expect = require('chai').expect,
      request = require('supertest'),
      Note = require('../../app_server/models/note'),
      app = require('../../app_server');

require('../spec_helper');

describe('Note REST API test',function(){
    it('create a new note',function(done){
        request(app)
            .post('/api/notes')
            .send({
                body:"Jag kommer gärna. I would love to come",
                vocabularies: ['gärna']
            })
            .expect(200,done);
    });
    describe('update,delete note',function(){
        var noteId;
        beforeEach(function(done){
            Note.create({body:"Jag kommer gärna. I would love to come",
                         vocabularies: ['gärna']})
                .then(function(note){
                    noteId = note.get('id');
                    expect(noteId).to.not.be.null;
                    done();
                })
                .catch(done);
        });
        it('update a note',function(done){
            request(app)
                .put(`/api/notes/${noteId}`)
                .send({
                    body: "en solig dag (a sunny day)",
                    vocabularies: ['solig']
                })
                .expect(200,done);
        });
        it('delete a note',function(done){
            request(app)
                .delete(`/api/notes/${noteId}`)
                .expect(200,done);
        });
        it('search notes by its associated vocabularies',function(done){
            setTimeout(function(){
                request(app)
                    .get('/api/notes/_search?verb=gär')
                    .expect(200)
                    .end(function(err,res){
                        var data = res.body;
                        expect(data).to.have.length.above(0);
                        expect(data[0]['_id']).to.equal(noteId);
                        done();
                    });
            },1000);
        });
        it('list notes from last 5 days');
        it('list notes by tags');
    });    
});
