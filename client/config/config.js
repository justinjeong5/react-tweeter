const AWS_URL = 'http://tweeter.api.shinywaterjeong.com';
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
