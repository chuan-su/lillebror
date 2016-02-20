const xmlParser = require('xml2json');
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
function translationArray(arr){
    return arr.map(pair => {
        var newPair = { value: pair.value};
        if (pair.translation) newPair.translation = pair.translation.value;
        return newPair;
    });
};
function wordBuilder(xml){
    
    var word = xmlParser.toJson(xml,{object:true}).word;

    var newWord = {
        value: word.value,
        lang: word.lang,
        class: word.class && wordClass[word.class],
        sound: word.phonetic && word.phonetic.soundFile,
        pronoun: word.phonetic && word.phonetic.value 
    };

    if(word.paradigm && word.paradigm.inflection){
        if(word.paradigm.inflection.constructor == Array){
            newWord.inflection = word.paradigm.inflection.map(pair => pair.value);
        }else{
            newWord.inflection = [word.paradigm.inflection.value];
        }
    }
    ['translation','synonym'].forEach(
        key => {
            if (word[key] && word[key].constructor == Array){
                newWord[key] = word[key].map(pair => pair.value);
            }else if(word[key]){
                newWord[key] = [word[key].value];
            }
        }
    );

    ['definition','example','idiom','derivation','compund','explanation'].forEach(
        
        key => {
            
            if(word[key] && word[key].constructor == Array){
                newWord[key] = translationArray(word[key]);
                
            }else if(word[key]){
                
                newWord[key]= translationArray([word[key]]);
            }
        }
    );

    return newWord;
}

module.exports = wordBuilder;
