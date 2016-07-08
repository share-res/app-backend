var express = require('express')
	,mongoose = require('mongoose')

exports.addRoutes = function(app) {
	var router = express.Router()
	/*var ress=['users']
	ress.forEach(function(item){  
		router.route('/'+item+'/:service')
		.post(function (req, res) {
			var api=require('../api-exec/api-'+item)
			api.exec(req, res) 
		})
	})*/
	router.route('/users/:service')
		.get(function (req, res) {
			var api=require('../api-exec/api-users')
			api.exec(req, res) 
		})
  return router
}
