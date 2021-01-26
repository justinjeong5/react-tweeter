const passport = require('passport');
const bcrypt = require('bcryptjs')
const { Strategy } = require('passport-local');
const { User } = require('../models')

module.exports = () => {
  passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password'
  }, async (email, password, done) => {
    try {
      const user = await User.findOne({
        where: { email }
      })
      if (!user) {
        return done(null, false, { code: 'NoSuchUser', message: '존재하지 않는 사용자입니다.' }) // done(server error, success, client error)
      }
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        return done(null, user);
      }
      return done(null, false, { code: 'InvalidPassword', message: '비밀번호가 일치하지 않습니다.' })
    } catch (error) {
      console.error(error);
      return done(error);
    }
  }));
} 