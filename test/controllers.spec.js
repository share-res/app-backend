import {connect,makedDemo,clean} from '../src/util/dbHelper'
import * as db from "../src/controllers/common"
import models from "../src/models"
require("should")

describe("CRUD test", function() {
  before(async (done)=>{
     try{
     await connect()
     await clean()
     await makedDemo()
     done() 
     }catch(ex){console.log(ex)}
  })
  after((done)=>{
     done()    
  })
  it("should have 2 users",async (done)=>{
        let data=await db.getData(models.User)
         data.should.have.length(2)
         done()
  })
  it("should have 3 tags",async (done)=>{
        let data=await db.getData(models.Tag)
         data.should.have.length(3)
         done()
  })
  it("should have 10 books",async (done)=>{
        let data=await db.getData(models.Book)
         data.should.have.length(10)
         done()
  })
})

