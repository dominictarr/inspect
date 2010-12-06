module.exports = inspect

/*
  currently this just does what util.inspect does 
  (although with refs)
  
  i will change this from inspect, to 'render'
  
  and add ways to control, say, white space,
  and how individual items are written out,
  add support for styling, and even HTML generation.

  I also need something which colour codes assertion messages.
  i.e. colour matching items green, and mismatching items red,
  uncompared items yellow..

  and for a while I've thought that colour coding levels of indentation would be interesting.
*/

function inspect(x){

  var values = []
    , uses = {}

    function complex(x){
      return (x && ('object' === typeof x || 'function' === typeof x))
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

  if (complex(x)) { repeats(x) } //else { return JSON.stringify(x) }

  var newValues = []
  for(i in values){
    if(uses[i]){
      newValues.push(values[i])
    }
  }
  function varName(x,assign){
    var index = newValues.indexOf(x)
    return index !== -1 ? ("REF" + index + (assign ? " = " : "")) : ""
  }

  wrote = []

  function isFunction(f){
    if('function' !== typeof f)
      return ''
    name = /function (\w*\(\w*\))/.exec("" + f)
    return "function" + (name ? (' ' + name[1] ) : "") 
  }

  function len (x){
    var l = 0
    x.forEach(function (e){
      l = l + (e ? e.length : 0)  + 2
    })
    return l
  }
  function spaces(indent){
    var s = ""
    while (s.length < indent){
      s += " "
    }
    return  s
  }
  function format(pre,func,ary,indent,array){
    var open,close;
    if (array || 'function' == typeof func) { open = '['; close = ']' }
    else       { open = '{'; close = '}' }
    var f = isFunction(func)
    var l = pre.length + f.length + len (ary) + indent

    if(ary.length == 0 && f != ''){
      return pre + open + f + close
      }  
    if (l > 80){
      if(f != '') f = f + '\n'
      if(pre != '') pre = pre + '\n  '
      open = open + ' '
      close = ' ' + close
      return pre + open + f + ary.join("\n" + spaces(indent) + ", ") + close
    } else {
      if(f != '') f = f + ' '
      return pre + open + f + ary.join(", ") + close
    }
  }
  function formatString(x,spaces){
    if(x.indexOf('\n') == -1){
      return JSON.stringify(x)
      }
    var list = x.split('\n')
      , last = list.pop()
  
    list = list.map(function(i){return i + '\n'})
    list.push(last)
    var s = '' + JSON.stringify(list.shift())
      
      list.forEach(function (e){
        s += '\n+ ' + JSON.stringify(e)
      })
      return s
  }  

  function stringify (x,spaces){
    if(wrote.indexOf(x) === -1) {
      if (x instanceof Array){
        wrote.push(x)
        var ary = x.map(function(v,k){return stringify(v,spaces + 2)})
          , pre = varName(x,true)
        return format(pre,null,ary,spaces,true)
        
      } else if (complex(x)) {
        wrote.push(x)
        var obj = []
        var pre = varName(x,true)
        for(i in x){
          obj.push(i  + ": " +  stringify(x[i],spaces + 2))
        }
        return format(pre,x,obj,spaces,false)
        /*
        return varName(x,true) + checkFunction(x, obj)
        */
      } else if ('string' == typeof x){
        return formatString(x,spaces)
      } else  {
        return JSON.stringify(x)
      }
    } else {
      return varName(x)
    }
  }

  return stringify(x,0)
}


