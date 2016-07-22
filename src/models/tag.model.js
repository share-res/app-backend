/**
 * 标签表
 */

'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TagSchema = new Schema({
	name:{						//标签名称
		type:String,
		unique: true
	},	
	isIndex:{
		type:Boolean,
		default:false
	},
	isShow: {
		type:Boolean,
		default:false
	},
	sort:{
		type:Number,
		default:1
	}
});

module.exports = mongoose.model('Tag',TagSchema);