import * as crud from "../controllers/common"
import models from "../models"
import {connect,makedDemo,clean} from '../util/dbHelper'
import test from 'ava'

test.before(async t => {
  try{
      await connect()
      await clean()
     // await makedDemo()
     t.pass()
  }catch(ex){console.log(ex)}
})

test('CRUD test', async (t) => {
    let data=await crud.save(models.Tag,{name:'demo',sort:1})
    let id=data.id;
   // console.log(data);
    data=await crud.getList(models.Tag,{sort:1})
    t.is(data[0].name,'demo')
    // console.log(data);
    let tag1=await crud.getById(models.Tag,id)
    t.is(tag1.name,'demo')
    tag1.name='LINUX'
    tag1.isShow=false
    let tag2=await crud.save(models.Tag,tag1)
    tag1=await crud.getById(models.Tag,id)
    t.is(tag1.name,'LINUX')
    t.is(tag1.isShow,false)
})
