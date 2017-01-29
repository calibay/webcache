/* jslint esversion: 6 */
'use strict';

(function () {
  var apiUrl = 'http://localhost:3000/api';
  var userUrl = document.querySelector('#userUrl');
  var submitButton = document.querySelector('#submitButton');
  var status = document.querySelector('#status');

  submitButton.addEventListener('click', () => {
    status.innerHTML = userUrl.value;
  });
})();
