
var inspect = require('inspect')
  , c = [1,2,3]
  , a = []

function x (){}
c.push(c)
a.push(a)
x.x = x  
 
var examples = 
    [ [null, JSON.stringify(null)]
    , [undefined, JSON.stringify(undefined)]
    , ["hello"  ,'"hello"']
    , [1        , '1'     ]
    , [0.01231  ,'0.01231']
    , [[1,2,3]  ,'[1, 2, 3]']
    , [["a","b"],'["a", "b"]']
    , [{hi:"hello"},'{hi: "hello"}']
    , [c,"REF0 = [1, 2, 3, REF0]"]
    , [a,"REF0 = [REF0]"]
    , [inspect,"[Function: inspect(x)]"]
    , [x,"REF0 = {[Function: x()] x: REF0}"] ]

exports.inspect = function (test){

  examples.forEach(function (e){
    s = inspect(e[0])
    test.equal(s,e[1])
  })

  test.finish()
}
/*
  this works for repeated objects...
  but it doesn't actually produce valid js for circular objects
  (you'll get an error that REF0 is not defined yet)
*/


exports.inspect_long = function (test){
 var x = "123456767891011121314151617181920"
   , expected = [x,x,x,x,x,x,x]
   , expected2 = [1,2,x,5,6,7,8,9,{a:x},12,expected,14,15,16,expected,30]
   , expected3 = 
    { a: x
    , b: x
    , c: x
    , d: x
    , e: x
    , f: x }
    , expected4 = expected
      expected4[4] = expected3
   
    console.log(inspect(expected))
    console.log(inspect(expected2))
    console.log(inspect(expected3))
    console.log(inspect(require))
//    test.equal(s,"")

  test.finish()
}


