const { fetchMyIP, fetchCoordsByIp } = require('./iss');

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
//     console.log('It workie!', data);
//   }
// });