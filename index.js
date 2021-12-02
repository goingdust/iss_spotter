const { fetchMyIP, fetchCoordsByIp, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log('No workie!', error);
//   } else {
//     console.log('It workie! Returned IP:', ip);
//   }
// });

// fetchCoordsByIp('99.239.106.140', (error, data) => {
//   if (error) {
//     console.log('No workie!', error);
//   } else {
//     console.log('It workie! Returned coordinates:', data);
//   }
// });

// fetchISSFlyOverTimes({ latitude: '49.27670', longitude: '-123.13000' }, (error, response) => {
//   if (error) {
//     console.log('No workie!', error);
//   } else {
//     console.log('It workie! Returned flyover times:', response);
//   }
// });

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});