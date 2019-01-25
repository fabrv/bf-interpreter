import Start from './Start'
import chalk from 'chalk'
import * as fs from 'fs'

class UnitTests{
  memory: Array<number> = []
  constructor(testPath:string, evalPath: string){
    for (let i = 0; i < 32; i++){
      this.memory.push(0)
    }
    try {
      const testCode = fs.readFileSync(testPath, 'utf8')
      this.evalTest(testCode,testPath,evalPath)
    } catch (error) {
      console.log(error)
    }
  }

  evalTest(testCode: string, testPath: string, evalPath: string){
    let input: string = ' ';
    let i = 0;
    while (testCode[i] != '!' && i<testCode.length){
      if (i==0){input = ''}
      input += testCode[i]
      if (i == testCode.length - 1){
        input = ' '
      }
      i++
    }
    console.log('Input tested:',input)
    const testMemory = new Start(testPath,false,false,input).memory.toString()
    const evalMemory = new Start(evalPath,false,false,input).memory.toString()

    if (testMemory == evalMemory){
      console.log(chalk.green('✔ Success. Programs have equal memory'))
    }else{
      console.log(chalk.red('✘ Failure. Programs have different memory'))
      console.log('Expected memory:', chalk.yellow(testMemory))
      console.log('Returned memory:', chalk.red(evalMemory))
    }
  }
}

export default UnitTests