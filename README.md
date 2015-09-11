##add prop stream

###Usage

#### addProp(key, value) or addProp(obj)
  - all key/value pairs of obj get copied over
#### objectStream.pipe(addProp('easy', 'peasy')).pipe(objectStreamComsumer())
#### objectStream.pipe(addProp({easy:'peasy', objects: 'work', as: 'well'}).pipe(objectStreamComsumer())

#### addProp.stringify(key, val) to stringify output
