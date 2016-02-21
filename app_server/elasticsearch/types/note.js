const _ = require('lodash');
const client = require('..').client;

module.exports = {
    upsert: function(id,doc,cb){
        var note = _.pick(doc,['body','vocabularies','tags','createdAt','updatedAt','reviewedAt']);
        note.vocabularies = _.map(note.vocabularies,function(verb){
            return {value: verb};
        });
        note.tags = _.map(note.tags,function(tag){
            return {value: tag};
        });
        client.index({
            index: 'lillebror',
            type: 'notes',
            id: id,
            body: note
        },cb);
    },
    delete: function(id,cb){
        client.delete({
            index: 'lillebror',
            type: 'notes',
            id: id
        },cb);
    },
    search: function(q){
        return client.search({
            index: 'lillebror',
            type: 'notes',
            body:{
                query: {
                    match:{
                        "vocabularies.value": {query: q, analyzer:'standard'}
                    }
                }
            }
        }).then(function(resp){
            var hits = resp.hits.hits;
            return hits;
        });
    }
};
