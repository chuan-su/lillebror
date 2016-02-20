'use strict';

const gulp = require('gulp-param')(require('gulp'), process.argv),
      fs = require('fs'),
      Promise = require('bluebird'),
      request = require('request'),
      os = require('os');

gulp.task('default',function(){

});

gulp.task('importDictionary',function(lang){

    var dictionary = 'folkets_sv_en_public';
    
    if(lang == 'en') dictionary = 'folkets_en_sv_public';
    
    
    const saxParser = require('sax').createStream(true),
          saxpath = require('saxpath'),
          streamer = new saxpath.SaXPath(saxParser,'//word'),
          wordBuilder = require('./gulp/wordbuilder'),
          fileStream = fs.createWriteStream(`${dictionary}.json`);
    
    streamer.on('match',function(xml){
        let wordString = JSON.stringify(wordBuilder(xml));
        fileStream.write(wordString+''+os.EOL);
    });
    
    request(`http://folkets-lexikon.csc.kth.se/folkets/${dictionary}.xml`)
        .pipe(saxParser);
    
});
