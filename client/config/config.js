const AWS_URL = '54.180.147.16';
const LOCALHOST_URL = 'http://localhost:3065';

module.exports = {
  "development": {
    'server_url': LOCALHOST_URL,
  },
  "test": {
    'server_url': LOCALHOST_URL,
  },
  "production": {
    'server_url': AWS_URL,
  }
}
