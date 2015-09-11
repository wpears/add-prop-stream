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
  t.plan(6);

  var obj = {a: 'b'};
  var obj2 = {a: 'b', c: 'd'}
  var obj3 = {a: 'b', c: 'd', e: 'f'};
  var strng = new Buffer(JSON.stringify(obj))
  var strng2 = new Buffer(JSON.stringify(obj2));
  var strng3 = new Buffer(JSON.stringify(obj3));

  var cases = [
    {fn: addProps, args: {key: null, val: null}, expected: obj, message: 'No-op with empty props'},
    {fn: addProps, args: {key: 'c', val: 'd'}, expected: obj2, message: 'Key/value'},
    {fn: addProps, args: {key: {c: 'd', e: 'f'}, val: null}, expected: obj3, message: 'Adds with mixinObject'},
    {fn: addProps.stringify, args: {key: null, val: null}, expected: strng, message: 'Stringified no-op with empty props'},
    {fn: addProps.stringify, args: {key: 'c', val: 'd'}, expected: strng2, message: 'Stringified key/value'},
    {fn: addProps.stringify, args: {key: {c: 'd', e: 'f'}, val: null}, expected: strng3, message: 'Stringify adds with mixinObject'}
  ]

  cases.forEach(function(props){
    var trans = props.fn(props.args.key, props.args.val);
    trans.end(obj)
    trans.on('data', function(d){
    t.deepEqual(d, props.expected, props.message);
    });
  });
})
