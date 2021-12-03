const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIp = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  const geoData = JSON.parse(body);
  const coords = {};
  coords.latitude = geoData.latitude;
  coords.longitude = geoData.longitude;
  return request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIp)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const response = JSON.parse(data).response;
      return response;
    });
};

module.exports = {
  nextISSTimesForMyLocation
};