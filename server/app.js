const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs')

const dotenv = require('dotenv');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('passport');
const morgan = require('morgan')
const hpp = require('hpp')
const helmet = require('helmet')

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

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1)
  app.use(morgan('combined'))
  app.use(hpp());
  app.use(helmet());
  app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }))
} else {
  app.use(morgan('dev'))
  app.use(cors({
    origin: true,
    credentials: true,
  }))
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
  proxy: true,
  cookie: {
    httpOnly: true,
    secure: true,
    domain: process.env.NODE_ENV === 'production' && '.shinywaterjeong.com',
  }
}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
  res.send('Server Connected Successfully')
})

app.use('/', express.static(path.join(__dirname, 'uploads')))
app.use('/api/post', post)
app.use('/api/posts', posts)
app.use('/api/user', user)
app.use('/api/image', image)
app.use('/api/hashtag', hashtag)

const port = process.env.PORT || 3065
app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})