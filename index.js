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
        chunk[key] = mixinObj[key];
      });
    }else if(key){
      chunk[key] = val;
    }

    if(obj === writable) chunk = JSON.stringify(chunk);

    return cb(null, chunk);
  });
}

module.exports = addProps;
