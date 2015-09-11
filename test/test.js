var test = require('tape');
var addProps = require('../index');
var isTransform = require('isstream').isDuplex;

test('Makes streams', function(t){
  t.plan(6);
  t.ok(isTransform(addProps('a', 'b')), 'Transform for key value');
  t.ok(isTransform(addProps({'a': 'b'})), 'Transform for obj');
  t.ok(isTransform(addProps.stringify('a', 'b')), 'Transform for key value stringify');
  t.ok(isTransform(addProps.stringify({'a': 'b'})), 'Transform for obj stringify');
  t.ok(addProps('a', 'b')._readableState.objectMode, 'Normal output is in readableObjectMode');
  t.notOk(addProps.stringify('a', 'b')._readableState.objectMode, 'stringified output is not in readableObjectMode');
});
