const passport = require('koa-passport')
import models from  './models'
const User = models.User

User.findOne({ mobileNum: 'test' }, function (err, testUser) {
  if (!testUser) {
    console.log('test user did not exist; creating test user...')
    testUser = new User({
      mobileNum: 'test',
      password: 'test'
    })
    testUser.save()
  }
});

passport.serializeUser(function(user, done) {
  done(null, user._id)
});

passport.deserializeUser(function(id, done) {
  User.findById(id, done);
});

const LocalStrategy = require('passport-local').Strategy;

let check=(username, password, done)=>{
    //console.log(username);
    User.findOne({mobileNum: username})
        .then((user)=>{
           if(!user.authenticate(password)) {
             console.log('登录密码错误',{'mobileNum':mobileNum});
             return done(null, false, { error_msg: '用户名或密码错误.' });
           }
           //console.log(user);
           return done(null, user);
        });
}       
passport.use(
  new LocalStrategy({ usernameField: 'mobileNum', passwordField: 'password'}
      ,check));
 //console.log('set LocalStrategy');
