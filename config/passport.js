// 작성 기준 출처 : https://youtu.be/6FOq4cUdH8k?t=4055


const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// Load User Model
const model = require('../mongoose/model')
const UserModel = model.User

// passport
const pp = (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email', // input name="email"
        passwordField: 'password',
        session: true, // 로그인세션 저장여부
        passReqToCallback: false, // 기타 입력값에 대해 req.body로 검증할지 여부
      },
      (email, password, done) => {
        //Match User
        UserModel.findOne({ email: email })
          .then((user) => {
            if (!user) {
              return done(null, false, {
                message: 'that email is not registered',
              })
            }
            console.log(user)
            console.log(email, password, user.hashedPassword)
            //Match password
            bcrypt.compare(password, user.hashedPassword, (err, isMatch) => {
              if (err) throw err
              if (!isMatch) {
                return done(null, false, { message: 'that password incorrect' })
              } else {
                return done(null, user)
              }
            })
          })
          .catch((err) => console.log(err))
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.email)
  })

  passport.deserializeUser((email, done) => {
    UserModel.findOne({ email: email }, (err, user) => {
      done(err, user)
    })
  })
}

module.exports = pp
