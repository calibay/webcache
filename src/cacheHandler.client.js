'use strict';

(function () {
  var apiUrl = 'http://localhost:3005/api';
  var userUrl = document.querySelector('#userUrl');
  var urlSubmitButton = document.querySelector('#urlSubmitButton');
  var idSubmitButton = document.querySelector('#idSubmitButton');
  var userId = document.querySelector('#userId');
  var status = document.querySelector('#status');

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
  urlSubmitButton.addEventListener('click', function() {
    var ajaxUrl = apiUrl + "/?url=" + userUrl.value;
    ajaxRequest('POST', ajaxUrl, function(data) {
      var jsonData = JSON.parse(data);
      var html = "<p>Job ID: " + jsonData.id + "</p>";
      html += "<p>URL submitted: " + jsonData.url + "</p>";
      html += "<p>Job Status: " + jsonData.status + "</p>";
      status.innerHTML = html;
    });
  });

  idSubmitButton.addEventListener('click', function() {
    var ajaxUrl = apiUrl + "/?id=" + userId.value;
    ajaxRequest('GET', ajaxUrl, function(data) {
      status.innerHTML = data;
    });

  });
})();
