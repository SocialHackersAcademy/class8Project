const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const Organization = require('../models/OrganizationModel')
const keys = require('../config/keys')
​
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = keys.secretOrKey
​
module.exports = passport =>{
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done)=>{
            Organization.findById(jwt_payload.id)
              .then(user=>{
                  if(user){
                      return done(null,user)
                  }
                  return done(null, false)
              })
              .catch(err=>console.log(err))
        })
    )
}