const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    host: 'elasticsearch:9200',
    log: {
        type: 'file',
        level: 'error',
        path: '../../elasticsearch.log'
    }
});
const indexName = 'lillebror';

module.exports = {
    client: client,
    indexExists() {
        return client.indices.exists({index: indexName});
    },
    
    deleteIndex() {
        return this.indexExists().then(exists => {
            if(exists) return client.indices.delete({index:indexName});
            return true;
        });
    },
    initIndex() {
        return this.deleteIndex()
            .then(() => {
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
    initNoteTypeMapping() {
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
                        type: 'nested',
                        include_in_parent: true,
                        properties:{
                            value: {
                                type: 'string',
                                analyzer: 'autocomplete'
                            }
                        }
                    },
                    tags: {
                        type: 'nested',
                        include_in_parent: true,
                        properties:{
                            value:{
                                type: 'string',
                                analyzer: 'standard'
                            }
                        }
                    },
                    createdAt: {type: 'date'},
                    updatedAt: {type: 'date'},
                    reviewedAt: {type: 'date'}
                }
            }
        });
    }  
};
