const { connect, connection } = require('mongoose');

connect('mongodb://localhost/friendZone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;