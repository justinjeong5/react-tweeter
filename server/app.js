const express = require('express');
const app = express();

const post = require('./routes/post');

const db = require('./models')
db.sequelize.sync()
  .then(() => {
    console.log('Database Connected Successfully')
  })

app.get('/', (req, res) => {
  res.send('Server Connected Successfully')
})

app.use('/api/post', post)

app.listen(3065, () => {
  console.log('Server is running')
}) 