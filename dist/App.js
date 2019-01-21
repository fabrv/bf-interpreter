"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { version } = require('../package.json');
const minimist = require("minimist");
const Start_1 = require("./cmds/Start");
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
                console.log(`
        fuckrun start <file>
                
        version ............... Get fuckrun version
        help .................... Get help
        `);
                process.exit();
                break;
            case 'start':
                let start = new Start_1.default(this.args._[1], this.args.verbose);
                break;
            default:
                console.error(`"${cmd}" is not a valid command!`);
                break;
        }
    }
}
exports.default = new Brainfuck();
//# sourceMappingURL=App.js.map