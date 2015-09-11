##add properties stream

###Usage

#### addProps(key, value) or addProps(obj)
  - all key/value pairs of obj get copied over
#### objectStream.pipe(addProps('easy', 'peasy')).pipe(objectStreamComsumer())
#### objectStream.pipe(addProps({easy:'peasy', objects: 'work', as: 'well'}).pipe(objectStreamComsumer())

#### addProps.stringify(key, val) to stringify output
