const request = require('request');

const nextISSTimesForMyLocation = function(callback) {
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
    const ip = JSON.parse(body).ip;
    // print the ip address found
    // callback(null, ip);

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
  
      // callback(null, coords);
          
      request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
        if (error) {
          callback(error, null);
          return;
        }
        if (response.statusCode !== 200) {
          const msg = `Status Code ${response.statusCode} when fetching ISS flyover times: ${body}`;
          callback(Error(msg), null);
          return;
        }
    
        const passes = JSON.parse(body).response;
        // callback(null, passes);

        for (const pass of passes) {
          const datetime = new Date((pass.risetime * 1000));
          const duration = pass.duration;
          
          callback(null, `Next pass at ${datetime} for ${duration} seconds!`);
        }
      });
    });
  });
};

module.exports = {
  // fetchMyIP,
  // fetchCoordsByIp,
  // fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};