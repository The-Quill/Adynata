let chai = require('chai');
import AdynataParser from '../parser/index'
import AdynataTokenizer from '../tokenizer/index'
import AdynataError from '../error'
import CodeSnippets from './code_snippets'

let async = require('async')

chai.should();

var tokenizer;

describe('Builds', function() {
    it('should build', function(){
        async.series([
            function(callback){
              tokenizer = new AdynataTokenizer(CodeSnippets.OneVar.Int.Broken.Code) },
            () => { tokenizer.tokenize() }
        ])
    })
});
describe('Implementations', function(){
    describe('one variable assignment', function(){
        describe('int', function(){
            it('should work fine', function(){
                async.series([
                    function(callback){
                        tokenizer = new AdynataTokenizer(CodeSnippets.OneVar.Int.Working.Code)
                        callback()
                    },
                    () => { tokenizer.tokenize() },
                    () => { tokenizer._Tokens
                        .map((token) => { return {Name: token.Name, Value: token.Value} })
                        .should
                        .equal(CodeSnippets.OneVar.Int.Working.Result)
                        console.log(tokenizer._Tokens
                            .map((token) => { return {Name: token.Name, Value: token.Value} }))
                    }
                ])
            })
            it('should throw an AdynataError', function(){
                async.series([
                    function(callback){
                        tokenizer = new AdynataTokenizer(CodeSnippets.OneVar.Int.Broken.Code)
                        callback()
                    },
                    () => { expect(tokenizer.tokenize()).should.throw(AdynataError) }
                ])
            })
        })
        describe('string', function(){
            it('should work fine', function(){
                async.series([
                    function(callback){
                        tokenizer = new AdynataTokenizer(CodeSnippets.OneVar.String.Working.Code)
                        callback()
                    },
                    () => { tokenizer.tokenize() },
                    () => { tokenizer._Tokens
                        .map((token) => { return {Name: token.Name, Value: token.Value} })
                        .should
                        .equal(CodeSnippets.OneVar.String.Working.Result)
                    }
                ])
            })
            it('should throw an AdynataError', function(){
                async.series([
                    function(callback){
                        tokenizer = new AdynataTokenizer(CodeSnippets.OneVar.String.Broken.Code)
                        callback()
                    },
                    () => { expect(tokenizer.tokenize()).should.throw(AdynataError) }
                ])
            })
        })
    });
    describe('two variable assignment', function(){
        describe('int', function(){
            it('should work fine', function(){
                async.series([
                    function(callback){
                        tokenizer = new AdynataTokenizer(CodeSnippets.TwoVar.Int.Working.Code)
                        callback()
                    },
                    () => { tokenizer.tokenize() },
                    () => { tokenizer._Tokens
                        .map((token) => { return {Name: token.Name, Value: token.Value} })
                        .should
                        .equal(CodeSnippets.TwoVar.Int.Working.Result)
                    }
                ])
            })
            it('should throw an AdynataError', function(){
                async.series([
                    function(callback){
                        tokenizer = new AdynataTokenizer(CodeSnippets.TwoVar.Int.Broken.Code)
                        callback()
                    },
                    () => { expect(tokenizer.tokenize()).should.throw(AdynataError) }
                ])
            })
        })
        describe('string', function(){
            it('should work fine', function(){
                async.series([
                    function(callback){
                        tokenizer = new AdynataTokenizer(CodeSnippets.TwoVar.String.Working.Code)
                        callback()
                    },
                    () => { tokenizer.tokenize() },
                    () => { tokenizer._Tokens
                        .map((token) => { return {Name: token.Name, Value: token.Value} })
                        .should
                        .equal(CodeSnippets.TwoVar.String.Working.Result)
                    }
                ])
            })
            it('should throw an AdynataError', function(){
                async.series([
                    function(callback){
              tokenizer = new AdynataTokenizer(CodeSnippets.TwoVar.String.Broken.Code) },
                    () => { expect(tokenizer.tokenize()).should.throw(AdynataError) }
                ])
            })
        })
    });
    describe('reassignment', function(){
        describe('int', function(){
            it('should work fine', function(){
                async.series([
                    function(callback){
                        tokenizer = new AdynataTokenizer(CodeSnippets.Reassignment.Int.Working.Code)
                        callback()
                    },
                    () => { tokenizer.tokenize() },
                    () => { tokenizer._Tokens
                        .map((token) => { return {Name: token.Name, Value: token.Value} })
                        .should
                        .equal(CodeSnippets.Reassignment.Int.Working.Result)
                    }
                ])
            })
            it('should throw an AdynataError', function(){
                async.series([
                    function(callback){
                        tokenizer = new AdynataTokenizer(CodeSnippets.Reassignment.Int.Broken.Code)
                        callback()
                    },
                    () => { expect(tokenizer.tokenize()).should.throw(AdynataError) }
                ])
            })
        })
        describe('string', function(){
            it('should work fine', function(){
                async.series([
                    function(callback){
                        tokenizer = new AdynataTokenizer(CodeSnippets.Reassignment.String.Working.Code)
                        callback()
                    },
                    () => { tokenizer.tokenize() },
                    () => { tokenizer._Tokens
                        .map((token) => { return {Name: token.Name, Value: token.Value} })
                        .should
                        .equal(CodeSnippets.Reassignment.String.Working.Result)
                    }
                ])
            })
            it('should throw an AdynataError', function(){
                async.series([
                    function(callback){
                        tokenizer = new AdynataTokenizer(CodeSnippets.Reassignment.String.Broken.Code)
                        callback()
                    },
                    () => { expect(tokenizer.tokenize()).should.throw(AdynataError) }
                ])
            })
        })
    });

    // describe('scopes', function(){
    //     describe('function', function(){
    //         describe('anonymous', function(){
    //             it('should work fine', function(){
    //                 async.series([
    //                     function(callback){
    //                      tokenizer = new AdynataTokenizer(CodeSnippets.Scopes.Function.Anonymous.Working.Code)
    //                      },
    //                     () => { tokenizer.tokenize() },
    //                     () => { tokenizer._Tokens
    //                         .map((token) => { return {Name: token.Name, Value: token.Value} })
    //                         .should
    //                         .equal(CodeSnippets.Scopes.Function.Anonymous.Working.Result)
    //                     }
    //                 ])
    //             })
    //             it('should throw an AdynataError', function(){
    //                 async.series([
    //                     function(callback){
    //                         tokenizer = new AdynataTokenizer(CodeSnippets.Scopes.Function.Anonymous.Broken.Code)
    //                         callback()
    //                     },
    //                     () => { expect(tokenizer.tokenize()).should.throw(AdynataError) }
    //                 ])
    //             })
    //         })
    //         describe('declared', function(){
    //             it('should work fine', function(){
    //                 async.series([
    //                     function(callback){
    //                         tokenizer = new AdynataTokenizer(CodeSnippets.Scopes.Function.Declared.Working.Code)
    //                         callback()
    //                     },
    //                     () => { tokenizer.tokenize() },
    //                     () => { tokenizer._Tokens
    //                         .map((token) => { return {Name: token.Name, Value: token.Value} })
    //                         .should
    //                         .equal(CodeSnippets.Scopes.Function.Declared.Working.Result)
    //                     }
    //                 ])
    //             })
    //             it('should throw an AdynataError', function(){
    //                 async.series([
    //                     function(callback){
    //                         tokenizer = new AdynataTokenizer(CodeSnippets.Scopes.Function.Declared.Broken.Code)
    //                         callback()
    //                     },
    //                     () => { expect(tokenizer.tokenize()).should.throw(AdynataError) }
    //                 ])
    //             })
    //         })
    //     })
    //     describe('for', function(){
    //         it('should work fine', function(){
    //             async.series([
    //                 function(callback){
    //                     tokenizer = new AdynataTokenizer(CodeSnippets.Scopes.For.Working.Code)
    //                     callback()
    //                 },
    //                 () => { tokenizer.tokenize() },
    //                 () => { tokenizer._Tokens
    //                     .map((token) => { console.log(token); return {Name: token.Name, Value: token.Value} })
    //                     .should
    //                     .equal(CodeSnippets.Scopes.For.Working.Result)
    //                 }
    //             ])
    //         })
    //         it('should throw an AdynataError', function(){
    //             async.series([
    //                 function(callback){
    //                     tokenizer = new AdynataTokenizer(CodeSnippets.Scopes.For.Broken.Code)
    //                     callback()
    //                 },
    //                 () => { expect(tokenizer.tokenize()).should.throw(AdynataError) }
    //             ])
    //         })
    //     })
    // });
});
