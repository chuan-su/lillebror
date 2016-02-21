const Promise = require('bluebird');
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    host: 'localhost:9200'
});
const indexName = 'lillebror';

module.exports = {
    client: client,
    indexExists: function(){
        return client.indices.exists({index: indexName});
    },
    deleteIndex: function(){
        return this.indexExists().then(function(exists){
            if(exists) return client.indices.delete({index:indexName});
            return Promise.resolve();
        });
    },
    initIndex: function(){
        return this.deleteIndex()
            .then(function(){
                return client.indices.create({
                    index: indexName,
                    body: {
                        settings: {
                            analysis: {
                                filter:{
                                    autocomplete_filter: {
                                        type:'edge_ngram',
                                        min_gram: 2,
                                        max_gram: 20
                                    }
                                },
                                analyzer: {
                                    autocomplete: {
                                        type: "custom",
                                        tokenizer: "standard",
                                        filter: ["lowercase","autocomplete_filter"]
                                    }
                                }
                            }
                        }
                    }
                }); 
            });
    },
    initNoteTypeMapping: function(){
        return client.indices.putMapping({
            index: indexName,
            type: 'notes',
            body: {
                properties: {
                    body: {
                        type: 'string',
                        index: 'not_analyzed'
                    },
                    vocabularies: {
                        type: 'string',
                        index: 'analyzed',
                        analyzer: 'autocomplete'
                    },
                    tags: {
                        type: 'string',
                        index: 'analyzed',
                        analyzer: 'standard'
                    },
                    createdAt: { type: 'date'},
                    updatedAt: {type: 'date'},
                    reviewedAt: {type: 'date'}
                }
            }
        });
    }  
};
