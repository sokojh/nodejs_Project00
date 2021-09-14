const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// Load User Model
const model = require('../mongoose/model')
const UserModel = model.User

// passport
const pp = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email'}, (email, password, done)=>{
      //Match User
      User.findOne({email:email})
        .then(user=>{
          if(!user){
            return done(null, false, {message : 'that email is not registered'})
          }

          //Match password
          const match = bcrypt.compareSync(password, user.hashedPassword)
          if (!match) {
            return done(null, false, {message : 'that password incorrect'})
          } else {
            return done(null, user)
          }
        })
        .catch(err=>console.log(err))
    })
  )
}

module.exports = pp