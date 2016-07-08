var mongoose = require('mongoose')
  , parseArgs = require('minimist')
  , config = require('../config-test')


function connectDB(cb) {
  var degug = parseArgs(process.argv)['debug']
  var dbUrl = config.MongoDB
  dbUrl = dbUrl || 'mongodb://127.0.0.1/test'
  if (!!degug) {
    mongoose.set('debug', true)
    console.log('Connection : ', dbUrl)
  }
  mongoose.connect(dbUrl, cb)
}
function dropDB() {
  mongoose.connection.db.dropDatabase(function () {
      console.log('Drop Database')
  })
}
function closeDB(cb) {
  console.log('Close Database')	
  mongoose.disconnect(cb)
}
exports = module.exports
exports.connectDB = connectDB
exports.closeDB = closeDB
exports.dropDB = dropDB

