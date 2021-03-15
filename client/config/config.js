const AWS_URL = 'https://tweeter.api.shinywaterjeong.com';
const LOCALHOST_URL = 'http://localhost:3065';

const AWS_CLIENT_URL = 'https://tweeter.shinywaterjeong.com';
const LOCALHOST_CLIENT_URL = 'http://localhost:3000';

const config = {
  development: {
    serverUrl: LOCALHOST_URL,
    clientUrl: LOCALHOST_CLIENT_URL,
  },
  test: {
    serverUrl: LOCALHOST_URL,
    clientUrl: LOCALHOST_CLIENT_URL,
  },
  production: {
    serverUrl: AWS_URL,
    clientUrl: AWS_CLIENT_URL,
  },
};

export default config;
