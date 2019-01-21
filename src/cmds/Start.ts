import chalk from 'chalk'
class Start{
  constructor(file:string){
    console.log(`${process.cwd()}\\${file}`)
  }
}
export default Start