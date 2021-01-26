const express = require('express');
const app = express();
const cors = require('cors');
const post = require('./routes/post');
const user = require('./routes/user');
const db = require('./models')
db.sequelize.sync()
  .then(() => {
    console.log('Database Connected Successfully')
  })

app.use(cors({
  origin: true,
  credentials: false,
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Server Connected Successfully')
})

app.use('/api/post', post)
app.use('/api/user', user)

app.listen(3065, () => {
  console.log('Server is running')
})