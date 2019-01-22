import Start from './Start'
import chalk from 'chalk'
import * as fs from 'fs'

class UnitTests{
  memory: Array<number> = []
  constructor(testFile:string, evalFile: string, public verbose:boolean){
    const testPath: string = `${process.cwd()}\\${testFile}`
    const evalPath: string = `${process.cwd()}\\${evalFile}`
    for (let i = 0; i < 32; i++){
      this.memory.push(0)
    }
    try {
      this.evalTest(fs.readFileSync(testFile, 'utf8'), fs.readFileSync(evalFile, 'utf8'))
    } catch (error) {
      
    }
  }

  evalTest(testCode: string, evalCode: string){
    let input: string = ' ';
    let i = 0;
    while (testCode[i] != '!'){
      input += testCode[i]
      if (i = testCode.length - 1){
        input = ' '
      }
      i++
    }    
    const testMemory = new Start(testCode,false,false,input).memory.toString()
    const evalMemory = new Start(evalCode,false,false,input).memory.toString()

    if (testMemory == evalMemory){
      console.log(chalk.green('✔ Success. Programs have equal memory'))
    }else{
      console.log(chalk.red('✘ Failure. Programs have different memory'))
      console.log('Expected memory:', chalk.yellow(testMemory))
      console.log('Returned memory:', chalk.red(testMemory))
    }
  }
}