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
        this.memory = [[], []];
        this.pointer = [0, 0];
        this.strip = 0;
        this.output = '';
        this.loops = 0;
        this.inputptr = 0;
        this.expandMemory(32);
        for (let i = 0; i < 16; i++) {
            this.memory[1].push(0);
        }
        const path = `${process.cwd()}\\${file}`;
        console.log(chalk_1.default.blue(`Running file ${path}`));
        try {
            this.code = fs.readFileSync(path, 'utf8');
            let i = 0;
            while (this.code[i] != '!' && i < this.code.length) {
                if (i == 0) {
                    this.input = '';
                }
                this.input += this.code[i];
                if (i == this.code.length - 1) {
                    this.input = '';
                }
                i++;
            }
            this.run();
            console.log('\nREGISTERS:', this.memory[1].toString());
            console.log('MEMORY:   ', this.memory[0].toString());
        }
        catch (error) {
            console.error(chalk_1.default.red(`\nError: Unexpected error ${path} could not run. ${error}`));
        }
    }
    run() {
        let stdout = true;
        for (let i = 0; i < this.code.length; i++) {
            if (this.verbose) {
                console.log(chalk_1.default.magenta(`${i}:${this.code[i - 1] || ''}${this.code[i]}${this.code[i + 1] || ''} | ${this.pointer}: ${this.memory[this.strip][this.pointer[this.strip]]}`));
                console.log(chalk_1.default.yellow(this.memory.toString()));
            }
            switch (this.code[i]) {
                case '<':
                    if (this.pointer[this.strip] == 0) {
                        console.error(chalk_1.default.red(`\nError: Memory out of bounds. \nInstruction ${i}: ${this.code[i - 1] || ''}${this.code[i]}${this.code[i + 1] || ''}`));
                        return;
                    }
                    this.pointer[this.strip]--;
                    break;
                case '>':
                    if (this.pointer[this.strip] == this.memory[this.strip].length - 1) {
                        if (this.strip == 1) {
                            console.error(chalk_1.default.red(`\nError: Register memory out of bounds. \nInstruction ${i}: ${this.code[i - 1] || ''}${this.code[i]}${this.code[i + 1] || ''}`));
                            return;
                        }
                        else {
                            this.expandMemory(this.memory[0].length);
                        }
                    }
                    this.pointer[this.strip]++;
                    break;
                case '+':
                    if (this.memory[this.strip][this.pointer[this.strip]] == 255) {
                        this.memory[this.strip][this.pointer[this.strip]] = 0;
                    }
                    else {
                        this.memory[this.strip][this.pointer[this.strip]]++;
                    }
                    break;
                case '-':
                    if (this.memory[this.strip][this.pointer[this.strip]] == 0) {
                        this.memory[this.strip][this.pointer[this.strip]] = 255;
                    }
                    else {
                        this.memory[this.strip][this.pointer[this.strip]]--;
                    }
                    break;
                case '.':
                    process.stdout.write(String.fromCharCode(this.memory[this.strip][this.pointer[this.strip]]));
                    this.output += String.fromCharCode(this.memory[this.strip][this.pointer[this.strip]]);
                    break;
                case ',':
                    if (this.input == '') {
                        let input = prompt('INPUT:');
                        this.memory[this.strip][this.pointer[this.strip]] = input.charCodeAt(0);
                    }
                    else {
                        if (this.inputptr < this.input.length) {
                            this.memory[this.strip][this.pointer[this.strip]] = this.input.charCodeAt(this.inputptr);
                            this.inputptr++;
                        }
                        else {
                            console.error(chalk_1.default.red(`\nError: No input available. \nInstruction ${i}: ${this.code[i - 1] || ''}${this.code[i]}${this.code[i + 1] || ''}`));
                            return;
                        }
                    }
                    break;
                case '*':
                    if (this.debug) {
                        console.log('-----------BREAK--------------');
                        console.log(chalk_1.default.magenta(`${i}:${this.code[i - 1] || ''}${this.code[i]}${this.code[i + 1] || ''} | ${this.pointer}: ${this.memory[this.strip][this.pointer[this.strip]]}`));
                        console.log(chalk_1.default.yellow(this.memory.toString()));
                        let brake = prompt('DEBUG BREAK');
                        if (brake == 'exit' || brake == 'e') {
                            return;
                        }
                    }
                    break;
                case '^':
                    if (this.strip == 1) {
                        this.strip = 0;
                    }
                    else {
                        this.strip = 1;
                    }
                    break;
                // LOOPS
                case '[':
                    if (this.memory[this.strip][this.pointer[this.strip]] == 0) {
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
                    if (this.memory[this.strip][this.pointer[this.strip]] != 0) {
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
                        if (this.loops > 1000000) {
                            console.error(chalk_1.default.red(`\nError: Infite loop. \nInstruction ${i}: ${this.code[i - 1] || ''}${this.code[i]}${this.code[i + 1] || ''}`));
                            return;
                        }
                    }
                    else {
                        this.loops = 0;
                    }
                    break;
                //I/O
                case '#':
                    {
                        let filename = '';
                        let f = this.pointer[0];
                        while (this.memory[0][f] != 0 && f < this.memory[0].length) {
                            filename += String.fromCharCode(this.memory[0][f]);
                            f++;
                        }
                        const path = `${process.cwd()}\\${filename}`;
                        try {
                            this.input = `${fs.readFileSync(path, 'utf8')}\0`;
                            this.inputptr = 0;
                        }
                        catch (error) {
                            console.error(chalk_1.default.red(`\n${error}. \nInstruction ${i}: ${this.code[i - 1] || ''}${this.code[i]}${this.code[i + 1] || ''}`));
                            return;
                        }
                    }
                    break;
                case ':':
                    {
                        let filename = '';
                        let f = this.pointer[0];
                        while (this.memory[0][f] != 0 && f < this.memory[0].length) {
                            filename += String.fromCharCode(this.memory[0][f]);
                            f++;
                        }
                        const path = `${process.cwd()}\\${filename}`;
                        if (this.code[i + 1] != ':') {
                            const stream = fs.createWriteStream(path, { flags: 'a' });
                            const data = this.memory[0].slice(0, this.pointer[0]).concat(this.memory[0].slice(f, this.memory[0].length));
                            for (let i = 0; i < data.length; i++) {
                                if (data[i] > 0) {
                                    stream.write(String.fromCharCode(data[i]));
                                }
                            }
                            stream.end();
                        }
                        else {
                            fs.writeFileSync(path, '', 'utf8');
                            i++;
                        }
                    }
                    break;
            }
        }
        return { 'memory': this.memory, 'output': this.output };
    }
    expandMemory(length) {
        for (let i = 0; i < length; i++) {
            this.memory[0].push(0);
        }
    }
}
exports.default = Start;
//# sourceMappingURL=Start.js.map