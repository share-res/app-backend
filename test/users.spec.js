'use strict';
var expect = require('expect.js')
	, tool = require("../db/util")

var User = require('../models/users');

describe('User Test', function () {
	before(function () {
		tool.connectDB()
	})
	after(function () {
		tool.closeDB()
	})

	it('find All User', function (done) {
		User.find({}, function (err, data) {
			// data.should.be.an.Array
			expect(data).to.be.an('array')
			expect(data).to.have.length(2)
			done(err)
		});
	   })
	   it('find One User', function (done) {
		User.findOne({ name: 'demo' }, function (err, doc) {
			//console.log(doc);
			expect(doc.name).to.contain('demo')
			done(err)
		});
	   })

})

