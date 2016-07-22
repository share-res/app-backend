import config from '../config'
import models from  '../models'
import Debug from 'debug'

import mongoose from 'mongoose'

//mongoose.Promise = Promise
//mongoose.Promise = require('bluebird')

let isConnected = false
const debug = Debug('res-share:dbhelper')

export async function connect(){
 let promise = new Promise(function(resolve, reject) {
		if (!isConnected) {
			isConnected = true
			mongoose.connect(config.DB.mongoURL, config.DB.options, error=> {
				if (error) {
          reject(error);
        } else{
					debug('connect to mongodb......')
					resolve(true)
		   	}
			})
		}else{
			debug('connected to mongodb!')
			resolve(true)
		}
	})
	return promise;
}

export  async function clean(){
	await models.User.remove();
	await models.Tag.remove();
	await models.Book.remove();
	await models.Action.remove();
  debug("clean db");
	//return Promise.all([w1,w2,w3,w4]);
}

export  async function makedDemo(){
	debug("add 2 users");
    await models.User.create(
		{
			nickname: 'admin',
			mobileNum: '13922296328',
			email: 'admin@admin.com',
			role: 'admin',
			password: 'admin',
			status: 1
		},
		{
			nickname: 'test',
			obileNum: '13678996328',
			email: 'test001@test.com',
			role: 'user',
			password: 'test',
			status: 0
		});
	debug("add 3 tags");
	await models.Tag.create(
		{
			name: 'linux',
			is_show: true
		},
        {
			name: 'ios',
			is_show: true
		},
		{
			name: 'android',
			is_show: true
		});
	debug("add 10 books!");
    let tags = await models.Tag.find({});
	let data=[]
	for (let i = 0; i < 10; i++) {
			data.push({
		  	title: `第${(i+1)}本书`,
			  content: '',
			  tags: [tags[i % 3]._id],
			  status: 0
			})
	}
	await models.Book.create(...data)
	//return Promise.all([w1,w2,w3])
}

/*
export default ()=> {
  return new Promise((resolve, reject)=> {
    mongoose.connect(config.DB.mongoURL, config.DB.options, error=> {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}*/
