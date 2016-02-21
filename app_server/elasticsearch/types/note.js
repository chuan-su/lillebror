const _ = require('lodash');
const client = require('..').client;

module.exports = {
    upsert: (id,doc,cb) => {
        var note = _.pick(doc,['body','vocabularies','tags','createdAt','updatedAt','reviewedAt']);
        note.vocabularies = _.map(note.vocabularies,verb => ({value: verb}));
        note.tags = _.map(note.tags,tag => ({value: tag}));
        client.index({
            index: 'lillebror',
            type: 'notes',
            id: id,
            body: note
        },cb);
    },
    delete: (id,cb) => {
        client.delete({
            index: 'lillebror',
            type: 'notes',
            id: id
        },cb);
    },
    search: (q) => {
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
        }).then((resp) => resp.hits.hits);
    }
};
