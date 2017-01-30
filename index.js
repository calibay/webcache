/*jslint node: true */
/*jslint esversion: 6 */
'use strict';

var express = require('express');
var app = express();
var CacheHandler = require(process.cwd() + '/src/cacheHandler.server.js');
var config = {
    apiKey: "AIzaSyDNfNr5gCD6GwQZgFaxpLyoMiYgoHr7ycA",
    authDomain: "webcache-7c320.firebaseapp.com",
    databaseURL: "https://webcache-7c320.firebaseio.com",
    storageBucket: "webcache-7c320.appspot.com",
    messagingSenderId: "955465248219"
  };
var firebase = require('firebase');
firebase.initializeApp(config);
var cacheHandler = new CacheHandler(firebase);

app.use('/src', express.static(process.cwd() + '/src'));
app.route('/api')
  .get(cacheHandler.getJobs)
  .post(cacheHandler.newJob);

app.route('/')
  .get((req, res) => {
      res.sendFile(process.cwd() + '/public/index.html');
  })
  .post((req,res) => {
    var html = "<a href='/'>Add another URL</a>"
    var url = req.body.userUrl;
    console.log(url);
    res.send(html);
  });

app.listen(3005, function() {
  console.log('Server listening on port 3005');
});
