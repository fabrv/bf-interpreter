"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { version } = require('../package.json');
const minimist = require("minimist");
const Start_1 = require("./cmds/Start");
const UnitTest_1 = require("./cmds/UnitTest");
const chalk_1 = require("chalk");
class Brainfuck {
    constructor() {
        this.args = minimist(process.argv.slice(2));
        let cmd = this.args._[0] || 'help';
        if (this.args.version || this.args.v) {
            cmd = 'version';
        }
        if (this.args.help || this.args.h) {
            cmd = 'help';
        }
        switch (cmd) {
            case 'version':
                console.log(`v${version}`);
                process.exit();
                break;
            case 'help':
                console.log(chalk_1.default.cyan(`
        bfrun <command> <parameter(s)> <options>`));
                console.log(`        
        start <file> ............. Run Brainfuck file
            --verbose............. Prints a memory and instruction log
        debug <file>.............. Pauses the program and gives information every *
            --verbose............. Prints a memory and instruction log


        version .................. Get fuckrun version
        help ..................... Get help
        `);
                process.exit();
                break;
            case 'start':
                let start = new Start_1.default(this.args._[1], this.args.verbose);
                console.log(chalk_1.default.cyan(start.output));
                console.log('MEMORY:', start.memory.toString());
                break;
            case 'debug':
                let debug = new Start_1.default(this.args._[1], this.args.verbose, true);
                console.log(chalk_1.default.cyan(debug.output));
                console.log('MEMORY:', debug.memory.toString());
                break;
            case 'test':
                let test = new UnitTest_1.default(this.args._[1], this.args._[2]);
                break;
            default:
                console.error(`"${cmd}" is not a valid command.`);
                break;
        }
    }
}
exports.default = new Brainfuck();
//# sourceMappingURL=App.js.map