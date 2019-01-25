import chalk from 'chalk'
import * as fs from 'fs'
var prompt = require('prompt-sync')()
class Start{
  code: string
  memory: Array<any> = [[],[]]
  pointer: Array<number> = [0,0]
  strip: number = 0;
  output: string = ''
  loops: number = 0
  inputptr: number = 0
  
  constructor(file:string, public verbose:boolean, public debug: boolean = false, public input: string = ''){
    this.expandMemory(32)
    for (let i = 0; i < 10; i++){
      this.memory[1].push(0)
    }

    const path = `${process.cwd()}\\${file}`
    console.log(chalk.blue(`Running file ${path}`))

    try {
      this.code = fs.readFileSync(path,'utf8');
      this.run()
      console.log('REGISTERS:', this.memory[1].toString())
      console.log('MEMORY:   ', this.memory[0].toString())
    } catch (error) {
      console.error(chalk.red(`${path} could not be found.`))
    }    
  }

  run(){
    for (let i = 0; i < this.code.length; i++){
      if (this.verbose){
        console.log(chalk.magenta(`${i}:${this.code[i]} | ${this.pointer}: ${this.memory[this.strip][this.pointer[this.strip]]}`))
        console.log(chalk.yellow(this.memory.toString()))
      }      
      switch (this.code[i]){
        case '<':
          if (this.pointer[this.strip] == 0){
            console.error(chalk.red(`Memory out of bounds. Instruction ${i}:${this.code[i]}`))
            return
          }
          this.pointer[this.strip]--
          break
        case '>':
          if (this.pointer[this.strip] == this.memory[0].length - 1){            
            if (this.strip == 1){
              console.error(chalk.red(`Register memory out of bounds. Instruction ${i}:${this.code[i]}`))
              return
            }else{
              this.expandMemory(this.memory[0].length)
            }
          }
          this.pointer[this.strip]++
          break
        case '+':
          this.memory[this.strip][this.pointer[this.strip]]++
          break
        case '-':
          if (this.memory[this.strip][this.pointer[this.strip]] == 0){
            console.error(chalk.red(`Negatives not allowed. Instruction ${i}:${this.code[i]}`))
            return
          }
          this.memory[this.strip][this.pointer[this.strip]]--
          break
        case '.':
          this.output += String.fromCharCode(this.memory[this.strip][this.pointer[this.strip]])
          break
        case ',':
          if (this.input == ''){
            let input: string = prompt('INPUT:')
            this.memory[this.strip][this.pointer[this.strip]] = input.charCodeAt(0)
          }else{
            this.memory[this.strip][this.pointer[this.strip]] = this.input.charCodeAt(this.inputptr)
            this.inputptr++
          }
          break
        
        case '*':
          if (this.debug){
            console.log('-----------BREAK--------------')
            console.log(chalk.magenta(`${i}:${this.code[i]} | ${this.pointer}: ${this.memory[this.strip][this.pointer[this.strip]]}`))
            console.log(chalk.yellow(this.memory.toString()))
            let brake: string = prompt('DEBUG BREAK')
            if (brake == 'exit' || brake == 'e'){
              return
            }
          }
          break

        case '^':
          if (this.strip == 1){
            this.strip = 0
          }else{
            this.strip = 1
          }
          break

        // LOOPS
        case '[':
          if (this.memory[this.strip][this.pointer[this.strip]] == 0){
            let u = i
            let openLoops: number = 1
            while(this.code[u] != ']' || openLoops > 0){
              if (this.code[u+1] == '['){openLoops++}
              if (this.code[u+1] == ']'){openLoops--}
              u++
            }
            i = u
          }
          break

        case ']':
          if (this.memory[this.strip][this.pointer[this.strip]]!=0){
            let u = i
            let openLoops: number = 1
            while(this.code[u] != '[' || openLoops > 0){
              if (this.code[u-1] == ']'){openLoops++}
              if (this.code[u-1] == '['){openLoops--}
              u--
            }
            i = u
            this.loops ++
            if (this.loops > 10000){
              console.error(chalk.red(`Infite loop. Instruction ${i}:${this.code[i]}`))
              return
            }
          }else{
            this.loops = 0;
          }
          break
      }
    }
    return {'memory': this.memory, 'output': this.output}
  }

  expandMemory(length: number){
    for (let i = 0; i < length; i++){
      this.memory[0].push(0)
    }
  }
}
export default Start