const express = require('express');
const cors = require('cors');

const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('passport');

const passportConfig = require('./passport');
const post = require('./routes/post');
const user = require('./routes/user');
const db = require('./models');
const app = express();

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


app.get('/', (req, res) => {
  res.send('Server Connected Successfully')
})

app.use('/api/post', post)
app.use('/api/user', user)

app.listen(3065, () => {
  console.log('Server is running')
})