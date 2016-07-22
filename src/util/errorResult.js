/**
 * Created by chenchunyong on 4/25/16.
 */

/**
 * 返回的错误消息.
 * 参考github v3 api 设计结构:https://developer.github.com/v3/
 * @param message 消息
 * @param status  状态
 * @param errorOptions Array[object] 类型,返回错误消息的可选项
 * @constructor
 */
function ErrorResult(message, status, errorOptions) {
  this.message = message;
  this.status = status;
  this.errors = errorOptions;
}
ErrorResult.prototype = new Error();
ErrorResult.prototype.constructor = ErrorResult;

/**
 * 返回给客户端多选的信息
 * @param resource 资源
 * @param field  字段
 * @param code 类型,包括 missing,missing_field,invalid,already_exists
 * @constructor
 */
export function ErrorOption(resource, field, code) {
  this.resource = resource;
  this.field = field;
  this.code = code;
}

export default ErrorResult;
/*
       if(user.status === 0){
          logger.error('未验证用户登录',{'username':email});
          return done(null, false, { error_msg: '用户未验证.' });
        }
let GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
    clientID: 'b47484128bd168e35744',
    clientSecret: '4ba66d8a564152d340609659e1f1209f695d7f4c',
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ github_id: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

const FacebookStrategy = require('passport-facebook').Strategy
passport.use(new FacebookStrategy({
    clientID: 'your-client-id',
    clientSecret: 'your-secret',
    callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/facebook/callback'
  },
  function(token, tokenSecret, profile, done) {
    // retrieve user
    User.findOne({ facebook_id: profile.id }, done);
  }
))
*/

