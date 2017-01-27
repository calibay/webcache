/*jslint node: true */
/*jslint esversion: 6 */
'use strict';


var express = require('express');
var app = express();
var https = require('https');
var firebase = require('firebase');
var config = {
    apiKey: "AIzaSyDNfNr5gCD6GwQZgFaxpLyoMiYgoHr7ycA",
    authDomain: "webcache-7c320.firebaseapp.com",
    databaseURL: "https://webcache-7c320.firebaseio.com",
    storageBucket: "webcache-7c320.appspot.com",
    messagingSenderId: "955465248219"
  };
firebase.initializeApp(config);

app.use(express.static('public'));

app.get('/api/new/:url*?', (req, res) => {
  var url = req.params.url + req.params[0];
  //root database ref
  var dbRef = firebase.database().ref();
  //random alphanumeric for ID
  var newID = Math.random().toString(36).substring(7);
  //newID will be the Object key for the new entry
  var content = "";
  var entryRef;
  var newEntry = {};
  newEntry[newID] = {status: 'caching'};

  if(/http:/.exec(url)) {
    url = url.replace('http', 'https');
  }
  https.get(url, (response) => {
    dbRef.update(newEntry);
    response.on('data', (chunk) => {
      content += chunk;
    });
  }).on('error', (e) => {
    console.log("Got error: " + e.message);
  }).on('close', () => {
    entryRef = firebase.database().ref(newID);
    entryRef.update({data: content });
    entryRef.update({'status': 'completed'});
    entryRef.on('value', (snapshot) => {
      res.send(snapshot.val());
    });
  });
});

app.listen(3004, function() {
  console.log('Server listening on port 3004');
});
