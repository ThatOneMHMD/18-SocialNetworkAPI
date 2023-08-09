// require mongoose lib. package
const { connect, connection } = require('mongoose');

// connet to db
connect('mongodb://127.0.0.1:27017/socialNetworkAPI');

// export connection data
module.exports = connection;