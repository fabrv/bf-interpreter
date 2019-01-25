const { version } = require('../package.json')
import * as minimist from 'minimist'
import Start from './cmds/Start'
import UnitTest from './cmds/UnitTest'
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
        bfrun <command> <parameter(s)> <options>`))
        console.log(`        
        start <file> ............. Run Brainfuck file
            --verbose............. Prints a memory and instruction log
        debug <file>.............. Pauses the program and gives information every *
            --verbose............. Prints a memory and instruction log


        version .................. Get fuckrun version
        help ..................... Get help
        `)

        process.exit()

        break

      case 'start':
        let start = new Start(this.args._[1], this.args.verbose)
        break
      case 'debug':
        let debug = new Start(this.args._[1], this.args.verbose, true)
        break
      case 'test':
        let test = new UnitTest(this.args._[1], this.args._[2])
        break
      default:
        console.error(`"${cmd}" is not a valid command.`)
        break
    }
  }

}
export default new Brainfuck()