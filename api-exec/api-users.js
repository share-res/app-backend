var debug = require('debug')('sr:api:users')

var User = require('../models/users')

exports.exec = function (req, res) {
	var sname = req.params.service
	debug(" API--" + sname)
	switch (sname) {
		case "uniqueNoe":
			//req.params.query
			User.find({ mobileNo: req.body.mobileNo }).then((data)=>{
			  debug('uniqueCode', data.length)
				res.json({ uniqueCode: data && data.length == 0 })
			})
			break
		case "load":
			User.find({ isActive: true }).select('name mobileNo').then((data)=>{
			  debug('load', data)
				res.json(data)
			})
			break

		default:
			res.json({ state: 'NONE' })
			break
	}
}
