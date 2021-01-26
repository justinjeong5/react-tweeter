const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Server Connected Successfully')
})

app.listen(3065, () => {
  console.log('Server is running')
})