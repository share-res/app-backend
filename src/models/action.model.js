/**
 * 资源使用表
 */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ActionSchema = new Schema({
	book_id:{
		type: Schema.Types.ObjectId,
		ref: 'Book'
	},
	user_id:{
		type: Schema.Types.ObjectId,
		ref:'User'
	},
	borrowDate: {
		type: Date,
		default: Date.now
	},
  returnDate: {
    type: Date,
    default: Date.now
  }
});
ActionSchema
  .virtual('status') //1：借出,2：归还
  .get(function() {
		let rt=0;
		if (!!this.borrowDate) 
		  rt=1;
		if (!!this.returnDate) 
		  rt=2;
    return rt;
  });
	
ActionSchema.set('toObject', { virtuals: true });
module.exports = mongoose.model('Action',ActionSchema);