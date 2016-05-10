//import "babel-polyfill";
import AdynataParser from './parser/index'
import AdynataTokenizer from './tokenizer/index'
let async = require('async')

var parser = new AdynataParser()
var tokenizer;

//parser.startRepl()

async.series([
    (callback) => {
        parser.getCode(callback)
    },
    function(callback){
        tokenizer = new AdynataTokenizer(parser.Code)
        callback()
    },
    () => { tokenizer.tokenize() }
])