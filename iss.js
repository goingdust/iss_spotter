const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    // parse the JSON string into an object
    const data = JSON.parse(body);
    // if there's an error, print it, and stop function
    if (error) {
      callback(error, null);
      return;
    }
    // if there's an error with the response, print a message with status code, body, and stop function
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // print the ip address found
    callback(null, data.ip);
  });
};

module.exports = { fetchMyIP };
