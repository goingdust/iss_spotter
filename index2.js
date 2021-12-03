const { nextISSTimesForMyLocation } = require('./iss_promised');

printPassTimes = function(passes) {
  for (const pass of passes) {
    const datetime = new Date((pass.risetime * 1000));
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log('No workie: ', error.message);
  });