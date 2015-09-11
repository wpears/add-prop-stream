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


test('Adds properly', function(t){
  t.plan(1);

  var obj = {a: 'b'};

  var cases = [
    {fn: addProps, args: {key: null, val: null}, expected: obj}]

  cases.forEach(function(props){
    var trans = props.fn(props.args.key, props.args.val);
    trans.end(obj)
    trans.on('data', function(d){
    t.deepEqual(d, props.expected, 'No-op with empty props');
    });
  });
})
