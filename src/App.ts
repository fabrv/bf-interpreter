const { version } = require('../package.json')
import * as minimist from 'minimist'
import Start from './cmds/Start'
import chalk from 'chalk';
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
        console.log(chalk.cyan(`
        fuckrun <command> <parameter(s)> <options>`))
        console.log(`        
        start <file> ............ Run Brainfuck file
           --verbose............. Prints a memory and instruction log

        version ................. Get fuckrun version
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