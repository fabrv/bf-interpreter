"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const fs = require("fs");
var prompt = require('prompt-sync')();
class Start {
    constructor(file, verbose) {
        this.verbose = verbose;
        this.memory = [];
        this.pointer = 0;
        this.output = '';
        this.loops = 0;
        for (let i = 0; i < 32; i++) {
            this.memory.push(0);
        }
        const path = `${process.cwd()}\\${file}`;
        console.log(chalk_1.default.blue(`Running file ${path}`));
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                console.error(chalk_1.default.red(`${path} could not be found.`));
            }
            this.code = data;
            this.run();
            console.log(chalk_1.default.cyan(this.output));
            console.log(this.memory.toString());
        });
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this.code.length; i++) {
                if (this.verbose) {
                    console.log(chalk_1.default.magenta(`${i}:${this.code[i]} | ${this.pointer}: ${this.memory[this.pointer]}`));
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
                        let input = prompt('INPUT:');
                        this.memory[this.pointer] = input.charCodeAt(0);
                        break;
                    // LOOPS
                    case '[':
                        if (this.memory[this.pointer] == 0) {
                            let u = i;
                            let openLoops = 0;
                            while (this.code[u] != ']' || openLoops == 0) {
                                u++;
                                if (this.code[u] == '[') {
                                    openLoops++;
                                }
                                if (this.code[u] == ']') {
                                    openLoops--;
                                }
                            }
                            i = u;
                        }
                        break;
                    case ']':
                        if (this.memory[this.pointer] != 0) {
                            let u = i;
                            let openLoops = 0;
                            while (this.code[u] != '[' || openLoops == 0) {
                                if (this.code[u - 1] == ']') {
                                    openLoops++;
                                }
                                if (this.code[u - 1] == '[') {
                                    openLoops--;
                                }
                                console.log(this.code[u - 1] != '[' && openLoops == 0);
                                console.log(chalk_1.default.cyan(`${openLoops} ; ${this.code[u - 1]}`));
                                u--;
                            }
                            i = u;
                        }
                }
            }
        });
    }
}
exports.default = Start;
//# sourceMappingURL=Start.js.map