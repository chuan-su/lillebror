'use strict';

const expect = require('chai').expect,
      request = require('supertest'),
      Note = require('../../app_server/models/note'),
      app = require('../../app_server');

require('../spec_helper');

describe('Note REST API test',() => {
    it('create a new note',done => {
        request(app)
            .post('/api/notes')
            .send({
                body:"Jag kommer gärna. I would love to come",
                vocabularies: ['gärna']
            })
            .expect(200,done);
    });
    describe('update,delete note',() => {
        var noteId;
        beforeEach( done => {
            Note.create({body:"Jag kommer gärna. I would love to come",
                         vocabularies: ['gärna']})
                .then(note => {
                    noteId = note.get('id');
                    expect(noteId).to.not.be.null;
                    done();
                })
                .catch(done);
        });
        it('update a note',done => {
            request(app)
                .put(`/api/notes/${noteId}`)
                .send({
                    body: "en solig dag (a sunny day)",
                    vocabularies: ['solig']
                })
                .expect(200,done);
        });
        it('delete a note',done => {
            request(app)
                .delete(`/api/notes/${noteId}`)
                .expect(200,done);
        });
        it('search notes by its associated vocabularies',done => {
            setTimeout(() => {
                request(app)
                    .get('/api/notes/_search?verb=gär')
                    .expect(200)
                    .end((err,res) => {
                        let data = res.body;
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
