//import "babel-polyfill";
import AdynataParser from './parser/index'
import AdynataTokenizer from './tokenizer/index'
let async = require('async')

var parser = new AdynataParser()
var tokens = [];

parser.startRepl(
    function(code){
        var tokenizer = new AdynataTokenizer(code)
        tokenizer.setTokens(tokens)
        tokenizer.tokenize();
        tokens = tokenizer.getTokens()
    }
)