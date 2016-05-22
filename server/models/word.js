const mongoose = require('mongoose');

const wordClass = {
    
    nn: "substantiv",
    jj: "adjektiv",
    vb: "verb",
    in: "interjektion",
    pp: "preposition",
    pn: "pronomen",
    ab: "adverb",
    rg: "grundtal",
    abbrev: "förkortning"
};

var translationSchema = new mongoose.Schema({
     value: String,
     translation: String
});

var wordSchema = new mongoose.Schema({

    value: String,
    
    lang: String,

    class: {type: String, set: function(val){ return wordClass[val];}},
    
    translation: [String],

    sound: String,

    pronoun: String,
    
    
    inflection: [String],                  
    synonym: [String],

    definition: [translationSchema],
    
    example: [translationSchema],
    
    idiom :[translationSchema],
    
    derivation: [translationSchema],
    
    compund: [translationSchema],
    
    explanation: [translationSchema],
    
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});


wordSchema.index({
    value: 'text',
    translation: 'text',
    inflection: 'text'
});

module.exports = mongoose.model('Word',wordSchema);
