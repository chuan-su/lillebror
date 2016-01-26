'use strict';

var gulp = require('gulp'),
    Promise = require('bluebird');

gulp.task('default',function(){

});

gulp.task('test',function(){

    var XmlStream = require('xml-stream');
    var fs = require('fs');
    
    var stream = fs.createReadStream('./data/test.xml');
    var xml = new XmlStream(stream);
    
    var data = '';

    xml.on('startElement:word',function(word){
        data = '';
    });
    
    xml.on('data',function(chunk){
        data += chunk;
    });
    xml.on('endElement:word',function(word){
       
        data += '</word>';
    });
    
});

gulp.task('import',function(){
    
    var parser = require('xml2json'),
        fs = require('fs'),
        readFile = Promise.promisify(fs.readFile);
          
    readFile('./data/folkets_sv_en_public.xml','utf8').then(function(dictionary){
        
        return Promise.resolve(parser.toJson(dictionary,{object:true}));
    }).then(function(result){
        var words = result.dictionary.word;

        require('./app_server/models');
        var Word = require('./app_server/models/word');
        var util = require('util');
        var os = require('os');
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
        words.forEach(function(word){
            
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
            let wordString = JSON.stringify(newWord);
            
            fs.appendFileSync("./data/folkets_sv_en_public.json",wordString+''+os.EOL,'utf8');
            
        });
        console.log('finished');
        
    }).catch(function(e){
        console.log("Error",e); 
    });
});

function translationArray(arr){
    return arr.map(pair => {
        var newPair = { value: pair.value};
        if (pair.translation) newPair.translation = pair.translation.value;
        return newPair;
    });
};
