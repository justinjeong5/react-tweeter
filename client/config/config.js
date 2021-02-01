const AWS_URL = 'https://tweeter.api.shinywaterjeong.com';
const LOCALHOST_URL = 'http://localhost:3065';

const AWS_CLIENT_URL = 'https://tweeter.shinywaterjeong.com'
const LOCALHOST_CLIENT_URL = 'http://localhost:3000';


const config = {
  "development": {
    'server_url': LOCALHOST_URL,
    'client_url': LOCALHOST_CLIENT_URL,
  },
  "test": {
    'server_url': LOCALHOST_URL,
    'client_url': LOCALHOST_CLIENT_URL,
  },
  "production": {
    'server_url': AWS_URL,
    'client_url': AWS_CLIENT_URL,
  }
}

export default config
