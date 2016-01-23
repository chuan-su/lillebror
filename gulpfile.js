'use strict';

var gulp = require('gulp'),
    Promise = require('bluebird');

gulp.task('default',function(){

});

gulp.task('import',function(){
    
    var parser = require('xml2json'),
        readFile = Promise.promisify(require('fs').readFile);
        
    readFile('./data/test.xml','utf8').then(function(dictionary){
        
        return Promise.resolve(parser.toJson(dictionary,{object:true}));
    }).then(function(result){
        var util = require('util');
        var words = result.dictionary.word;
        console.log(util.inspect(words,false,null));
    }).catch(function(e){
        console.log("Error",e); 
    });
});
