"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const fs = require("fs");
var prompt = require('prompt-sync')();
class Start {
    constructor(file, verbose, debug = false, input = '') {
        this.verbose = verbose;
        this.debug = debug;
        this.input = input;
        this.memory = [];
        this.pointer = 0;
        this.output = '';
        this.loops = 0;
        this.inputptr = 0;
        for (let i = 0; i < 32; i++) {
            this.memory.push(0);
        }
        const path = `${process.cwd()}\\${file}`;
        console.log(chalk_1.default.blue(`Running file ${path}`));
        try {
            this.code = fs.readFileSync(path, 'utf8');
            this.run();
        }
        catch (error) {
            console.error(chalk_1.default.red(`${path} could not be found.`));
        }
    }
    run() {
        for (let i = 0; i < this.code.length; i++) {
            if (this.verbose) {
                console.log(chalk_1.default.magenta(`${i}:${this.code[i]} | ${this.pointer}: ${this.memory[this.pointer]}`));
                console.log(chalk_1.default.yellow(this.memory.toString()));
            }
            switch (this.code[i]) {
                case '<':
                    if (this.pointer == 0) {
                        console.error(chalk_1.default.red(`Memory out of bounds. Instruction ${i}:${this.code[i]}`));
                        return;
                    }
                    this.pointer--;
                    break;
                case '>':
                    if (this.pointer == 31) {
                        console.error(chalk_1.default.red(`Memory out of bounds. Instruction ${i}:${this.code[i]}`));
                        return;
                    }
                    this.pointer++;
                    break;
                case '+':
                    this.memory[this.pointer]++;
                    break;
                case '-':
                    if (this.memory[this.pointer] == 0) {
                        console.error(chalk_1.default.red(`Negatives not allowed. Instruction ${i}:${this.code[i]}`));
                        return;
                    }
                    this.memory[this.pointer]--;
                    break;
                case '.':
                    this.output += String.fromCharCode(this.memory[this.pointer]);
                    break;
                case ',':
                    if (this.input == '') {
                        let input = prompt('INPUT:');
                        this.memory[this.pointer] = input.charCodeAt(0);
                    }
                    else {
                        this.memory[this.pointer] = this.input.charCodeAt(this.inputptr);
                        this.inputptr++;
                    }
                    break;
                case '*':
                    if (this.debug) {
                        console.log('-----------BREAK--------------');
                        console.log(chalk_1.default.magenta(`${i}:${this.code[i]} | ${this.pointer}: ${this.memory[this.pointer]}`));
                        console.log(chalk_1.default.yellow(this.memory.toString()));
                        let brake = prompt('DEBUG BREAK');
                        if (brake == 'exit' || brake == 'e') {
                            return;
                        }
                    }
                    break;
                // LOOPS
                case '[':
                    if (this.memory[this.pointer] == 0) {
                        let u = i;
                        let openLoops = 1;
                        while (this.code[u] != ']' || openLoops > 0) {
                            if (this.code[u + 1] == '[') {
                                openLoops++;
                            }
                            if (this.code[u + 1] == ']') {
                                openLoops--;
                            }
                            u++;
                        }
                        i = u;
                    }
                    break;
                case ']':
                    if (this.memory[this.pointer] != 0) {
                        let u = i;
                        let openLoops = 1;
                        while (this.code[u] != '[' || openLoops > 0) {
                            if (this.code[u - 1] == ']') {
                                openLoops++;
                            }
                            if (this.code[u - 1] == '[') {
                                openLoops--;
                            }
                            u--;
                        }
                        i = u;
                        this.loops++;
                        if (this.loops > 10000) {
                            console.error(chalk_1.default.red(`Infite loop. Instruction ${i}:${this.code[i]}`));
                            return;
                        }
                    }
                    else {
                        this.loops = 0;
                    }
                    break;
            }
        }
        return { 'memory': this.memory, 'output': this.output };
    }
}
exports.default = Start;
//# sourceMappingURL=Start.js.map