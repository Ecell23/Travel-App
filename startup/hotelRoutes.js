const searchByCity = require('../routes/hotel/searchByCity');

module.exports = function(app) {
  app.use('/api/hotels', searchByCity);
};

