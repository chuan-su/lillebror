const _ = require('lodash');
const client = require('..').client;

module.exports = {
    upsert: function(id,doc,cb){
        var note = _.pick(doc,['body','vocabularies','tags','created_at','updated_at','reviewedAt']);
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
    }
};
