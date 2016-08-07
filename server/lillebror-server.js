#!/usr/bin/env node
const debug = require('debug')('lillebror'),
      mongoose = require('./models'),
      dbURI = 'mongodb://mongodb:27017/lillebror';

mongoose.connection.on('connected',() => console.log(`Mongoose connected to ${dbURI}`));

mongoose.connection.on('error', err => console.log('Mongoose connection error',err));

mongoose.connection.on('disconnected',() => console.log('Mongoose disconnected'));

process.on('SIGINT',() => {
    mongoose.connection.close( () => {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});

mongoose.connect(dbURI);

const app = require('./app');

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log('app started');
  debug(`Express server listening on port ${process.env.PORT}`);
});
