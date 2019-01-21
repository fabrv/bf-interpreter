import chalk from 'chalk'
import * as fs from 'fs'
var prompt = require('prompt-sync')()
class Start{
  code: string
  memory: Array<number> = []
  pointer: number = 0
  output: string = ''
  loops: number = 0
  
  constructor(file:string, public verbose:boolean){
    for (let i = 0; i < 32; i++){
      this.memory.push(0)
    }
    const path = `${process.cwd()}\\${file}`
    console.log(chalk.blue(`Running file ${path}`))
    fs.readFile(path, 'utf8', (err, data)=>{
      if (err){
        console.error(chalk.red(`${path} could not be found.`))
      }
      this.code = data
      this.run()
      console.log(chalk.cyan(this.output))
      console.log('MEMORY:', this.memory.toString())
    })
  }

  async run(){
    for (let i = 0; i < this.code.length; i++){
      if (this.verbose){
        console.log(chalk.magenta(`${i}:${this.code[i]} | ${this.pointer}: ${this.memory[this.pointer]}`))
        console.log(chalk.yellow(this.memory.toString()))
      }      
      switch (this.code[i]){
        case '<':
          if (this.pointer == 0){
            console.error(chalk.red(`Memory out of bounds. Instruction ${i}:${this.code[i]}`))
            return
          }
          this.pointer--
          break
        case '>':
          if (this.pointer == 31){
            console.error(chalk.red(`Memory out of bounds. Instruction ${i}:${this.code[i]}`))
            return
          }
          this.pointer++
          break
        case '+':
          this.memory[this.pointer]++
          break
        case '-':
          if (this.memory[this.pointer] == 0){
            console.error(chalk.red(`Negatives not allowed. Instruction ${i}:${this.code[i]}`))
            return
          }
          this.memory[this.pointer]--
          break
        case '.':
          this.output += String.fromCharCode(this.memory[this.pointer])
          break
        case ',':
          let input: string = prompt('INPUT:')
          this.memory[this.pointer] = input.charCodeAt(0)
          break
        
        case '/':
          let brake: string = prompt('DEBUG BREAK')
          break


        // LOOPS
        case '[':
          if (this.memory[this.pointer] == 0){
            let u = i
            let openLoops: number = 0
            while(this.code[u] != ']' || openLoops == 0){
              u++
              if (this.code[u] == '['){openLoops++}
              if (this.code[u] == ']'){openLoops--}
            }
            i = u
          }
          break

        case ']':
          if (this.memory[this.pointer]!=0){
            let u = i
            let openLoops: number = 0
            while(this.code[u] != '[' || openLoops == 0){
              if (this.code[u-1] == ']'){openLoops++}
              if (this.code[u-1] == '['){openLoops--}
              u--
            }
            i = u
          }
      }
    }
  }
}
export default Start