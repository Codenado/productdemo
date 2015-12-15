function setupAuth(User, app){
  var passport = require('passport')
  var FacebookStrategy = require('passport-facebook').Strategy

  passport.serializeUser(funciton(user, done){
    done(null, user._id)
  })

  passport.deserializeUser(function(id, done){
    findOne({ _id : id})
    exec(done)
  })

  passport.use(new FacebookStrategy(
    {
        clietID: process.env.FACEBOOK_CLIET_ID,
        cleintSecret: process.env.FACEBOOK_CLIET_SECRET,
        callbackURL: 'http://localhost:3000/auth/facebook/callback'
    },
    function(accessToken, refreshToken, profile, done){
      if (!profile.emails || !profile.emails.length){
        return done('No emails associated with this account')
      }

      User.findOneAndUpdate(
        {'data.oath' : profile.id},
        {
          $set: {
            'profile.username': profile.emails[0].value,
            'profile.picture': "http://graph.facebook.com/" + profile.id.toString() + '/picture?type=large'
          }
        },
        { 'new' : true, upsert:true, runValidators: true }
        function(e, user) {
            done(e, user)
        })
      }))

    app.use(require('express-session'({
      secret: 'this is a secret'
    })))
    app.use(passport.intialize())
    app.use(passport.session())

    app.get('/auth/facebook',
    passport.authenticate('facebook', {failreRedirect: 'fail'}),
    function(res, req) {
      res.send("Welcome," + req, user.profile.username)
    })
}

module.exports = setupAuth
