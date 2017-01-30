'use strict';

function CacheHandler(firebase) {

  var dbRef = firebase.database().ref();
  var https = require('https');

  // Gets a single job if the request query includes a id, otherwise
  // returns all jobs in the database
  this.getJobs = function(req, res) {
    dbRef.on('value', function (snapshot) {
      if (req.query.id === undefined) {
        res.send(snapshot.val());
      } else {
        var id = req.query.id;
        if (id in snapshot.val()) {
          res.send(snapshot.val()[id]);
        } else {
          res.send("ID not found");
        }
      }
    });
  };

  // Gets the url string from the query and retrieves the body.  Stores in
  // a firebase database
  this.newJob = function(req, res) {
    var url = 'https://' + req.query.url;
    var dbRef = firebase.database().ref();
    //random alphanumeric for ID
    //newID will be the Object key for the new entry
    var newID = Math.random().toString(36).substring(7);
    var content = "";
    var entryRef;
    var newEntry = {};
    newEntry[newID] = {url: url, status: 'caching'};

    https.get(url, function(response) {
      dbRef.update(newEntry);

      response.on('data', function(chunk) {
        content += chunk;
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    }).on('close', function() {
      entryRef = firebase.database().ref(newID);
      entryRef.update({data: content });
      entryRef.update({'status': 'completed'});
      entryRef.on('value', function (snapshot) {
        var snapshotVal = snapshot.val();
        snapshotVal.id = newID;
        res.send(snapshotVal);
      });
    });
  };
}

module.exports = CacheHandler;
