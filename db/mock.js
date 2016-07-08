var async = require('async')
	, mongoose = require('mongoose')

require('../models/users.js')

function getFn(rec) {
	return function (callback) {
		mongoose.models[rec.model].create(rec.data, function (err, doc) {
			callback(null, doc)
		})
	}
}
var makeFn = function (ds) {
	var fns = []
	for (idx in ds) {
		fns.push(getFn(ds[idx]))
	}
	return fns
}
var makeData = function (done) {
	var admin = {
		model: "User", data: {
			name: 'admin', password: 'admin', 
			mobileNo: '1234',isActive: true
		}
	}
	var dev = {
		model: "User", data: {
			name: 'demo',  password: 'demo', 
			mobileNo: '6789', isActive: false
		}
	}

	var ds = [admin, dev]
	async.parallel(makeFn(ds), function (err, results) {

		var admin = results[0]
			, dev = results[1]

		console.log('save ' + admin.name);
		console.log('save ' + dev.name);


	})
}

module.exports = {
	makeData: makeData
}




