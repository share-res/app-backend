/** 
 * 文章表
 */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BookSchema = new Schema({
	owner_id:{
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	title:{
		type:String,
		unique: false
	},
	content:String,
	//一本书可以有多个标签
	tags:[{
	  type: Schema.Types.ObjectId,
	  ref: 'Tag'
	}],
	loanCount:{			//借出次数
		type:Number,
		default:0
	},
	status:{				//0:空闲 1:使用中
		type:Number,
		default:0
	},
	registerDate: {
		type: Date,
		default: Date.now
	}
});

BookSchema
  .virtual('info')
  .get(function() {
    return {
    	'_id': this._id,
      'title': this.title,
      'content': this.content,
      'loanCount': this.loanCount,
      'status':this.status
    };
  });

module.exports = mongoose.model('Book',BookSchema);