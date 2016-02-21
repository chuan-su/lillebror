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
        it.only('delete a note',function(done){
            request(app)
                .delete(`/api/notes/${noteId}`)
                .expect(200,done);
        });
    });
    it('list notes from last 5 days');
    it('search notes by its associated vocabularies');
    it('list notes by tags');
});
