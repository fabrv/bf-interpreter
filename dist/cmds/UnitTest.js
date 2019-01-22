"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Start_1 = require("./Start");
const chalk_1 = require("chalk");
const fs = require("fs");
class UnitTests {
    constructor(testPath, evalPath) {
        this.memory = [];
        for (let i = 0; i < 32; i++) {
            this.memory.push(0);
        }
        try {
            const testCode = fs.readFileSync(testPath, 'utf8');
            this.evalTest(testCode, testPath, evalPath);
        }
        catch (error) {
            console.log(error);
        }
    }
    evalTest(testCode, testPath, evalPath) {
        let input = ' ';
        let i = 0;
        while (testCode[i] != '!') {
            if (i == 0) {
                input = '';
            }
            input += testCode[i];
            if (i == testCode.length - 1) {
                input = ' ';
            }
            i++;
        }
        console.log('Input tested:', input);
        const testMemory = new Start_1.default(testPath, false, false, input).memory.toString();
        const evalMemory = new Start_1.default(evalPath, false, false, input).memory.toString();
        if (testMemory == evalMemory) {
            console.log(chalk_1.default.green('✔ Success. Programs have equal memory'));
        }
        else {
            console.log(chalk_1.default.red('✘ Failure. Programs have different memory'));
            console.log('Expected memory:', chalk_1.default.yellow(testMemory));
            console.log('Returned memory:', chalk_1.default.red(evalMemory));
        }
    }
}
exports.default = UnitTests;
//# sourceMappingURL=UnitTest.js.map