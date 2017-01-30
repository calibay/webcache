'use strict';

var express = require('express');
var app = express();
var config = {
    apiKey: "AIzaSyDNfNr5gCD6GwQZgFaxpLyoMiYgoHr7ycA",
    authDomain: "webcache-7c320.firebaseapp.com",
    databaseURL: "https://webcache-7c320.firebaseio.com",
    storageBucket: "webcache-7c320.appspot.com",
    messagingSenderId: "955465248219"
  };
var firebase = require('firebase');
firebase.initializeApp(config);
// cacheHandler.server.js is used to process server side request for
// user URL submit and user ID request.
var CacheHandler = require(process.cwd() + '/src/cacheHandler.server.js');
var cacheHandler = new CacheHandler(firebase);

app.use('/src', express.static(process.cwd() + '/src'));

app.route('/api')
  .get(cacheHandler.getJobs)
  .post(cacheHandler.newJob);

app.route('/')
  .get(function(req, res) {
      res.sendFile(process.cwd() + '/public/index.html');
  });

app.listen(3005, function() {
  console.log('Server listening on port 3005');
});
