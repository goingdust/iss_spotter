const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
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
    // parse the JSON string into an object
    const data = JSON.parse(body);
    // print the ip address found
    callback(null, data.ip);
  });
};

const fetchCoordsByIp = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
    const coords = {};
    coords.latitude = String(data.latitude);
    coords.longitude = String(data.longitude);

    callback(null, coords);
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIp
};