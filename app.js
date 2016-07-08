var express = require('express')
   ,bodyParser = require('body-parser')
   ,logger = require('morgan')
   ,session = require('express-session')
   ,debug = require('debug')('kb:main')
   ,security=require('./security')


var config=null;
var myenv=process.env.NODE_ENV
if("production"==myenv){
	config=require('./config-production')
}
else config=require('./config-test')

var app = express()
var server = require('http').createServer(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({ 
	secret: config.cookieSecret,
	resave: false,
    saveUninitialized: true
 }))

security.initialize(app)
app.use("/api", require('./routes/api').addRoutes(app));
app.use("/db", require('./routes/data').addRoutes(app));
//require('./routes/security').addRoutes(app, security);
//require('./routes/static').addRoutes(app, config);
	app.use(function(req, res, next) {
	  var err = new Error('Not Found')
	  err.status = 404
	  next(err)
	})


	app.use(function(err, req, res, next) {
	  res.status(err.status || 500)
	  res.json({
		message: err.message,
		error: err
	  })
	})
module.exports = server;

