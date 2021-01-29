const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs')

const dotenv = require('dotenv');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('passport');
const morgan = require('morgan')

const passportConfig = require('./passport');
const post = require('./routes/post');
const posts = require('./routes/posts');
const user = require('./routes/user');
const image = require('./routes/image');
const hashtag = require('./routes/hashtag');
const db = require('./models');
const app = express();

try {
  fs.accessSync('uploads')
} catch (error) {
  console.log('mkdirSync /uploads')
  fs.mkdirSync('uploads')
}

dotenv.config();
passportConfig();
db.sequelize.sync()
  .then(() => {
    console.log('Database Connected Successfully')
  })

app.use(cors({
  origin: true,
  credentials: true,
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('Server Connected Successfully')
})

app.use('/', express.static(path.join(__dirname, 'uploads')))
app.use('/api/post', post)
app.use('/api/posts', posts)
app.use('/api/user', user)
app.use('/api/image', image)
app.use('/api/hashtag', hashtag)

app.listen(3065, () => {
  console.log('Server is running')
})