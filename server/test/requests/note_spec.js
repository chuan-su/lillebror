'use strict';

const expect = require('chai').expect,
      request = require('supertest'),
      Promise = require('bluebird'),
      Note = require('../../models/note'),
      app = require('../../app');

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
        describe('list notes',() => {
            var date = days => {
                let date = new Date();
                date.setDate(date.getDate() - days );
                return date;
            };
            var notes = [
                {
                    body: 'jag kan tyvärr inte komma (unfortunately, I cannot come)',
                    vocabularies: ['tyvärr'],
                    tags: ['dairly'],
                    updatedAt: date(1) 
                },
                {
                    body: 'Skall bli spännande att prova.',
                    vocabularies: ['spännande'],
                    tags: ['dairly'],
                    updatedAt: date(2)
                },
                {
                    body: 'Vi har fixat de problem som vi pratade på Skype mötet senast.',
                    vocabularies: ['fixat','senast','mötet'],
                    tags: ['på jobbet'],
                    updatedAt: date(5)
                }
            ];
            beforeEach(done => {
                Promise.map(notes,note => Note.create(note))
                    .finally(done);
            });
            it('list notes by dates', done => {
                request(app)
                    .get(`/api/notes?date=${date(4)}`)
                    .expect(200)
                    .end(function(err,res){
                        expect(res.body.length).to.eq(1);
                        done();
                    });
            });
            it('list notes by tags');
        });
        
    });    
});
