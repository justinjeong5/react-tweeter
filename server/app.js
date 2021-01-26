const http = require('http');
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  if (req.method === 'GET') {
    if (req.url === '/api/posts') {
      return res.end('/api/posts, GET')
    } else if (req.url === '/api/comment') {
      return res.end('/api/comment, GET')
    }
  } else if (req.method === 'POST') {
    if (req.url === '/api/post') {
      return res.end('/api/post, POST')
    }
  }
  else if (req.method === 'DELETE') {
    if (req.url === '/api/post') {
      return res.end('/api/post, DELETE')
    }
  }
  res.end('Server Connected Successfully')
});

server.listen(3065, () => {
  console.log('Server is running')
})