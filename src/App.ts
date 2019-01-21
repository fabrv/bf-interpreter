const { version } = require('../package.json')
import * as minimist from 'minimist'
import Start from './cmds/Start'
class Brainfuck {

  args: minimist.ParsedArgs = minimist(process.argv.slice(2))
  constructor(){
    let cmd = this.args._[0] || 'help'

    if (this.args.version || this.args.v) {
      cmd = 'version'
    }

    if (this.args.help || this.args.h) {
      cmd = 'help'
    }

    switch (cmd) {
      case 'version':
        console.log(`v${version}`)
        process.exit()
        break

      case 'help':
        console.log(`
        fuckrun start <file>
                
        version ............... Get fuckrun version
        help .................... Get help
        `)

        process.exit()

        break

      case 'start':
        let start = new Start(this.args._[1], this.args.verbose)        
        break
      default:
        console.error(`"${cmd}" is not a valid command!`)
        break
    }
  }

}
export default new Brainfuck()