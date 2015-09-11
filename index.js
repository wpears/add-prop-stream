var through = require('through2');

var writable = {writableObjectMode: 1};
var objectMode = {objectMode: 1};


function addProps(key, val){
  return makeStream(objectMode, key, val);
}


addProps.stringify = function(key, val){
  return makeStream(writable, key, val);
};


function makeStream(obj, key, val){
  var mixinObj;

  if(!val && typeof key === 'object') mixinObj = key;

  return through(obj, function(chunk, enc, cb){
    chunk = JSON.parse(JSON.stringify(chunk));

    if(mixinObj){
      Object.keys(mixinObj).forEach(function(key){
        addProp(chunk, key, mixinObj[key]);
      });
    }else if(key){
      addProp(chunk, key, val);
    }

    if(obj === writable) chunk = JSON.stringify(chunk);

    return cb(null, chunk);
  });
}

function addProp(obj, key, val){
  var innerObj = obj;
  var nested = key.split('.');

  for(var i=0; i<nested.length; i++){
    var v = nested[i];
    if(i === nested.length-1) return innerObj[v] = val
    var newObj = innerObj[v];
    if(!newObj) newObj = innerObj[v] = {};
    innerObj = newObj;
  }
}

module.exports = addProps;
