let fs = require("fs");
let path = require('path');
require("should");
//var assert = require('assert');

let fname=path.join(__dirname,'data.txt');
//console.log(fname);
describe("readFile", function() {
  before(function() {
    // runs before all tests in this block
    // 在执行所有的测试用例前 函数会被调用一次
  });
  after(function() {
    // runs after all tests in this block
    // 在执行完所有的测试用例后 函数会被调用一次
  });
  beforeEach(function() {
    // runs before each test in this block
     // 在执行每个测试用例前 函数会被调用一次
  });

  afterEach(function() {
    // runs after each test in this block
    // 在执行每个测试用例后 函数会被调用一次
  });

    it("The file content should be alex", function(done) {
        fs.readFile(fname, 'utf8',function(err, data) {
			data.should.eql("alex");
            //assert.equal("alex",data);
            done();
        });
    });
});
var name = "alex";

describe("Name", function() {
    it("The name should be alex", function() {
        name.should.eql("alex");
    });
});

var Person = function(name) {
    this.name = name;
};
var man = new Person(name);

describe("InstanceOf", function() {
    it("man should be an instance of Person", function() {
        man.should.be.an.instanceof(Person);
    });

    it("man should be an instance of Object", function() {
        man.should.be.an.instanceof(Object);
    });
});
describe("Property", function() {
    it("man should have property name", function() {
        man.should.have.property("name");
    });
});
