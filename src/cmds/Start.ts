import chalk from 'chalk'
import * as fs from 'fs'
import * as readLine from 'readline'
class Start{
  code: string
  memory: Array<number> = []
  pointer: number = 0
  output: string = ''
  
  constructor(file:string){
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
      console.log(this.pointer)
    })
  }

  run(){
    for (let i = 0; i < this.code.length; i++){
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
        case '-':
          if (this.memory[this.pointer] == 0){
            console.error(chalk.red(`Negatives not allowed. Instruction ${i}:${this.code[i]}`))
            return
          }
          break
        case '.':
          this.output += String.fromCharCode(this.memory[this.pointer])
          break
        case ',':
          const rl = readLine.createInterface({
            input: process.stdin,
            output: process.stdout
          });
          rl.question('', (answer) => {
            this.memory[this.pointer] = answer.charCodeAt(0)
            rl.close();
          });
          break
      }
    }
  }
}
export default Start