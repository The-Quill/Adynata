import readline from 'readline'
import colors from 'colors'

export default class AdynataParser {
    constructor() {
        this.Code = [];
    }
    startRepl(callback){
        let REPL = readline.createInterface(process.stdin, process.stdout)
        //REPL.setPrompt('> '.green.bold)
        REPL.prompt()

        REPL.on('line', function(STDIN) {

            if (STDIN === 'quit') REPL.close()

            if (callback) callback(STDIN)

            REPL.prompt()

        })
        .on('close', () => process.exit(0))
    }
    getCode(callback){
        process.stdin.setEncoding('utf8')
        process.stdin.on('readable', () => {
            var chunk = process.stdin.read()
            if (chunk !== null) {
                this.Code = this.Code.concat(chunk.split(''))
            }
        })
        process.stdin.on('end', callback)
    }
}
