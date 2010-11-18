var inspect = require('inspect')

exports.inspect_simple = function (test){
  var examples =
        [ ["hello"  ,'"hello"']
        , [1        , '1'     ]
        , [0.01231  ,'0.01231']
        , [[1,2,3]  ,'[1,2,3]']
        , [["a","b"],'["a","b"]']
        , [{hi:"hello"},'{hi: "hello"}']
        ]

  examples.forEach(function (e){
    s = inspect(e[0])
    test.equal(s,e[1])
  })

  test.finish()
}
/*
  this works for repeated objects...
  but it doesn't actually produce valid js for circular

*/

exports.inspect_repeats = function (test){
  var a = [1,2,3]
  var examples =
        [ [[a,a],'[v0 = [1,2,3],v0]']
        , [{hi:"hello"},'{hi: "hello"}']
        ]

  circular = [1,2,3]
  circular.push(circular)
  circular_string = "v0 = [1,2,3,v0]"

  function check (e){
    s = inspect(e[0])
    test.equal(s,e[1])
  }
  examples.forEach(check)

  check([circular,circular_string])

  test.finish()
}

exports.inspect_circular = function (test){
  var a = []
    a.push(a)

  c = [1,2,3]
  c.push(c)
  var expected = [
      [c,"v0 = [1,2,3,v0]"]
    , [a,"v0 = [v0]"]
  ]
  
  function check (e){
    s = inspect(e[0])
    test.equal(s,e[1])
  }
  expected.forEach(check)

  test.finish()
}
/*
exports.inspect_functions = function (test){

  function x(){}
  x.x = x
  var expected = [
      [inspect,"[function]"]
    , [x,"v0 = {[function] x: v0}"]
  ]
  
  function check (e){
    s = inspect(e[0])
    test.equal(s,e[1])
  }
  expected.forEach(check)

  test.finish()
}
*/

exports.inspect_functions_names = function (test){

  function x(){}
  x.x = x
  var expected = [
      [inspect,"[Function: inspect(x)]"]
    , [x,"v0 = {[Function: x()] x: v0}"]
  ]
  
  function check (e){
    s = inspect(e[0])
    test.equal(s,e[1])
  }
  expected.forEach(check)

  test.finish()
}
