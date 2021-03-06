var assert = require('assert');
var toMongodb = require('../');
var chai = require('chai');

describe('jsonpatch to mongodb', function() {

  it('should work with add', function() {
    var patches = [{
      op: 'add',
      path: '/name',
      value: 'dave'
    }];

    var expected = {
      $push: {
        name: 'dave'
      }
    };

    assert.deepEqual(toMongodb(patches), expected);
  });

  it('should work with remove', function() {
    var patches = [{
      op: 'remove',
      path: '/name',
      value: 'dave'
    }];

    var expected = {
      $unset: {
        name: 1
      }
    };

    assert.deepEqual(toMongodb(patches), expected);
  });

  it('should work with replace', function() {
    var patches = [{
      op: 'replace',
      path: '/name',
      value: 'dave'
    }];

    var expected = {
      $set: {
        name: 'dave'
      }
    };

    assert.deepEqual(toMongodb(patches), expected);
  });

  it('should work with test', function() {
    var patches = [{
      op: 'test',
      path: '/name',
      value: 'dave'
    }];

    var expected = {};

    assert.deepEqual(toMongodb(patches), expected);
  });

  it('should blow up on move', function() {
    var patches = [{
      op: 'move',
      path: '/name',
      from: '/old_name'
    }];

    chai.expect(function(){toMongodb(patches)}).to.throw('Unsupported Operation! op = move');

  });


  it('should blow up on copy', function() {
    var patches = [{
      op: 'copy',
      path: '/name',
      from: '/old_name'
    }];

    chai.expect(function(){toMongodb(patches)}).to.throw('Unsupported Operation! op = copy');
  });
});

