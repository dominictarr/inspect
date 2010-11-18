module.exports = inspect

function inspect(x){

  var values = []
    , uses = {}

    function complex(x){
      return ('object' === typeof x || 'function' === typeof x)
    }
    function repeats (x){
      for(i in x){
        if(complex(x[i]))
          var index = values.indexOf(x[i])
          if(index == -1) {
            values.push(x[i])
            repeats(x[i])
          } else {
            uses[index] = true
          }
      }
    }

  if (complex(x)) { repeats(x) } else { return JSON.stringify(x) }

  var newValues = []
  for(i in values){
    if(uses[i]){
      newValues.push(values[i])
    }
  }
  function varName(x,assign){
    var index = newValues.indexOf(x)
    return index !== -1 ? ("v" + index + (assign ? " = " : "")) : ""
  }

  wrote = []

  function header(f){
   name = /function (\w*\(\w*\))/.exec("" + f)
//    return name[1]
   return "[Function" + (name ? (': ' + name[1] ) : "") + "]"
  }

  function checkFunction(x,obj){
    if('function' == typeof x){
      if (obj.length > 0)
        return '{' + header(x) + ' ' + obj.join(',') + '}'
      else
        return header(x)
    } else {
       return '{' + obj.join(',') + '}'
    }
  }


  function stringify (x){
    if(wrote.indexOf(x) === -1) {
      if (x instanceof Array){
        wrote.push(x)
        return varName(x,true) + "[" + x.map(function(v,k){return stringify(v)}).join(",") + "]"
        
      } else if (complex(x)) {
        wrote.push(x)
        var obj = []
        for(i in x){
          obj.push(i  + ": " +  stringify(x[i]))
        }
        return varName(x,true) + checkFunction(x, obj)
        //return varName(x,true) + "{" + obj.join(",") + "}"
      } /*else if( 'function' == typeof x) {
        wrote.push(x)
        return varName(x,true) + '[function]'
        
      } */else  {
        return JSON.stringify(x)
      }
    } else {
      return varName(x)
    }
  }
  return stringify(x)
}


