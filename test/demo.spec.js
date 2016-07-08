'use strict';
var expect = require('expect.js')

function add(a, b) { return a + b; };
describe('demo test suite', function () {
  it('should expose a function', function () {
    expect(add).to.be.a('function');
  })
  it('2+3=5', function () {
    expect(add(2, 3)).to.equal(5);
  })

})
