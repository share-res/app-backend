'use strict';

var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


var UserSchema = new Schema({
	mobileNo: { type: String, index: true },
	password: String,
	name: String,
	regDate: { type: Date, default: Date.now },
	isActive: { type: Boolean, default: true },
	desc: String
});

UserSchema.plugin(passportLocalMongoose, {
	usernameField: 'mobileNo',
	hashField: 'password',
	saltlen: 8,
	keylen: 32
});


UserSchema.pre('save', function (next) {
    if (this.password && this.password.length < 20) { // not encrypt
		this.setPassword(this.password, function (err, user) {
			if (err)
				console.log("setPasswod ERROR");
			else
				console.log("passwod encrypted!", user.password);
			next();

		});
	} else { // encrypted
		next();
	}
});

module.exports = mongoose.model('User', UserSchema);
