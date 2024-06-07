const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: 8080,
    URI: 'mongodb://127.0.0.1:27017/userDB',
    SECRET_ACCESS_TOKEN: '22a1f6b46aff296d3ee431fba0c04a6be958ef7a'
  };