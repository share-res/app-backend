/** 
 * 用户表
 */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

let UserSchema = new Schema({
	nickName:String,
	mobileNum:String,
	email: {
		type: String,
		lowercase: true
	},
	provider: {
		type:String,
		default:'local'
	},
	github_id  :String,
	qq:{
		id           : String,
		token        : String,
		email        : String,
		name         : String
	},
	contributedScore:{			//贡献度
		type:Number,
		default:0
	},
	creditScore:{			//信用值
		type:Number,
		default:0
	},
	contributedBookList:[{
		type:Schema.Types.ObjectId,
		ref:'Book'
	}],
	hashedPassword: String,
	salt: String,
	role: {
		type : String ,
		default : 'user'
	},
	avatar:String,
	status:{
		type:Number,
	  default:0
	},
	created: {
		type: Date,
		default: Date.now
	},
   updated: {
 	  type: Date,
	  default: Date.now
  }
});

/**
 * Virtuals
 */
UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });


UserSchema
  .virtual('userInfo')
  .get(function() {
    return {
			'mobileNum': this.mobileNum,
      'nickName': this.nickName,
      'role': this.role,
      'contributedScore':this.contributedScore,
			'creditScore':this.creditScore,
      'provider':this.provider
    };
  });

UserSchema
  .virtual('providerInfo')
  .get(function() {
    return {
      'qq': this.qq,
      'github': this.github
    };
  });

// Non-sensitive info we'll be putting in the token
UserSchema
  .virtual('token')
  .get(function() {
    return {
      '_id': this._id,
      'role': this.role
    };
  });

UserSchema
	.path('mobileNum')
	.validate(function(value, respond) {
		var self = this;
		this.constructor.findOne({mobileNum: value}, function(err, user) {
			if(err) throw err;
			if( user && self.id != user.id) 
			  return respond(false);
			return respond(true);
			
		});
	}, '这个手机号已被使用.');
/**
 * methods
 */
UserSchema.methods = {
	//检查用户权限
	hasRole: function(role) {
		var selfRoles = this.role;
		return (selfRoles.indexOf('admin') !== -1 || selfRoles.indexOf(role) !== -1);
	},
	//验证用户密码
	authenticate: function(plainPwd) {
	  return this.encryptPassword(plainPwd) === this.hashedPassword;
	},
/*
  makeSalt() {
    return (Math.round(new Date().valueOf() * Math.random())).toString();
  },
	*/
	makeSalt: function() {
	  return crypto.randomBytes(16).toString('base64');
	},
	//加密
	encryptPassword: function(plainPwd) {
	  if (!plainPwd || !this.salt) return '';
	  var salt = new Buffer(this.salt, 'base64');
		try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(plainPwd)
        .digest('hex');
    } catch (err) {
      return '';
    }
	 // return crypto.pbkdf2Sync(plainPwd, salt, 10000, 64).toString('base64');
	}
}

UserSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('User', UserSchema);
