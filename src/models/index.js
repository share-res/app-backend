import {connect} from '../util/dbHelper'
import mongoose from 'mongoose'
require('./user.model');
require('./tag.model');
require('./book.model');
require('./action.model');

mongoose.Promise = Promise
const User = mongoose.model('User')
const Book = mongoose.model('Book')
const Tag = mongoose.model('Tag')
const Action = mongoose.model('Action')

connect()

export default {
  Tag,
  User,
  Book,
  Action
}
