

if (module == require.main) {
  return require('async_testing').run(process.ARGV);
}


var inspect = require('inspect')
  , c = [1,2,3]
  , a = []

function x (){}
function func (args){}
c.push(c)
a.push(a)
x.x = x  

var ref0
var examples = 
    [ [null, JSON.stringify(null)]
    , [undefined, JSON.stringify(undefined)]
    , ["hello"  ,'"hello"']
    , ["oh!\nhell"  ,'"oh!\\n"\n+ "hell"']
    , [1        , '1'     ]
    , [0.01231  ,'0.01231']
    , [[1,2,3]  ,'[1, 2, 3]']
    , [["a","b"],'["a", "b"]']
    , [{hi:"hello"},'{hi: "hello"}']
    , [c,"REF0 = [1, 2, 3, REF0]"]
    , [a,"REF0 = [REF0]"]
    , [inspect,"[Function: inspect(x)]"]
    , [x,"REF0 = {[Function: x()] x: REF0}"] 
    , [{},'{}']
    , ['line1\nline2\nline3', '"line1\\n"\n+ "line2\\n"\n+ "line3"']
    , [{x: ref0 = {}, x2: ref0},'{x: REF0 = {}, x2: REF0}']
    , [[x,2,3,4,func, {"function": func , x: x } ],"[ REF0 = {[Function: x()] x: REF0}\n, 2\n, 3\n, 4\n, REF1 = [Function: func(args)]\n, {function: REF1, x: REF0} ]"  ]]

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



/*
exports.inspect_long = function (test){
 var y = "123456767891011121314151617181920"
   , expected = [y,y,y,y,y,y,y]
   , expected2 = [1,2,y,5,6,7,8,9,{a:y},12,expected,14,15,16,expected,30]
   , expected3 = 
    { a: y
    , b: y
    , c: y
    , d: y
    , e: y
    , f: y }
    , expected4 = expected
      expected4[4] = expected3
   
    console.log(inspect(expected))
    console.log(inspect(expected2))
    console.log(inspect(expected3))
    console.log(inspect(require))
    console.log(inspect([x,2,3,4,func, {"function": func , x: x } ]))

  test.finish()
}*/


