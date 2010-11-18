Inspect
=======

    var inspect = require('inspect')
    inspect(require)
    
    { [Function: require(path)]
    resolve: [Function: (request)]
    , paths: ["/home/dominic/code/node"]
    , main: REF0 = 
      { id: "."
      , exports: 
      , parent: undefined
      , filename: "/home/dominic/code/node/inspect/examples.js"
      , loaded: false
      , exited: false
      , children: []
      , load: REF1 = [Function: (filename)]
      , _compile: REF2 = [Function: (request)] }
    , extensions: {.js: [Function], .node: [Function]}
    , registerExtension: [Function: ()]
    , cache: { /home/dominic/code/node/inspect/inspect.js: { id: "./inspect"
        , exports: [Function: inspect(x)]
        , parent: REF0
        , filename: "/home/dominic/code/node/inspect/inspect.js"
        , loaded: true
        , exited: false
        , children: []
        , load: REF1
        , _compile: REF2 } } }



tests
-----
    npm install async_testing
    node test/inspect.asynct.js 
    
    
cheers
