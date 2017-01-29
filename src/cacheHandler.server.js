
function CacheHandler(firebase) {

  var dbRef = firebase.database().ref();
  function ajaxRequest (method, url, callback) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
       if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          callback(xmlhttp.response);
       }
    };

    xmlhttp.open(method, url, true);
    xmlhttp.send();
  }

  this.getJobs = function(req, res) {
    dbRef.on('value', function (snapshot) {
      res.send(snapshot.val());
    });
  }

  // var https = require('https');

  // app.get('/api/new/:url*?', (req, res) => {
  //   var url = req.params.url + req.params[0];
  //   //root database ref
  //   var dbRef = firebase.database().ref();
  //   //random alphanumeric for ID
  //   var newID = Math.random().toString(36).substring(7);
  //   //newID will be the Object key for the new entry
  //   var content = "";
  //   var entryRef;
  //   var newEntry = {};
  //   newEntry[newID] = {status: 'caching'};
  //
  //   if(/http:/.exec(url)) {
  //     url = url.replace('http', 'https');
  //   }
  //   https.get(url, (response) => {
  //     dbRef.update(newEntry);
  //     response.on('data', (chunk) => {
  //       content += chunk;
  //     });
  //   }).on('error', (e) => {
  //     console.log("Got error: " + e.message);
  //   }).on('close', () => {
  //     entryRef = firebase.database().ref(newID);
  //     entryRef.update({data: content });
  //     entryRef.update({'status': 'completed'});
  //     entryRef.on('value', (snapshot) => {
  //       res.send(snapshot.val());
  //     });
  //   });
  // });
}


module.exports = CacheHandler;
