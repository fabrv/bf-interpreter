# Brainfuck CLI Interpreter
NodeJS Brainfuck and Brainfuck ♭ console interpreter

## Install and use
### Prerequisites
1. NodeJS
### Install
1. `npm i -g bfrun`
### Use
| Command       | Properties | Description         |
|---------------|------------|---------------------|
| start <_file_>| --verbose  | Runs brainfuck file |
| debug <_file_>| --verbose  | Debug brainfuck project, add _*_ to add a debug breakpoint |
| test <_spec file_> <_to eval file_>| | Unit test a brainfuck file with brainfuck, compare the memory result |
| help          |            | Help from the CLI |

## Brainfuck Flat (BFF / B♭)
BFF is a Brainfuck derivative inspired by [Brainfuck++](http://www.jitunleashed.com/bf/spec.txt), it expands standard Brainfuck in two ways: 
1. Having two different memory arrays  
  a. The `register` array has a fixed 16 cells   
  b. The standard `memory` has a dynamic length, it doubles everytime the memory pointer moves past its length
2. Adds this commands:

  
| Command | Specification            |
|---------|--------------------------|
| ^       | Swaps between memory strip and registers strip. |
| #       | Reads filename until a null byte is reached, input buffer will now be said file, pointer returns to original cell. If file doesn't exists the program will exit. |
| :       | Reads filename until a null byte is reached, dumps all non-zero memory except filename in said file. If file doesn't exists the program will exit. |
| ::      | Reads filename until a null byte is reached, writes file with no content, if a file already existis it **will** replace it. |

## Unit testing
Now you can unit test a brainfuck file with another brainfuck file!
To use it first create a new brainfuck file, preferably name it like the file you want to test with a `_spec` after the name and with extension `.bf`. 
Inside the file start with the input to test and finish the input with a `!`, everything before the exclamation mark will be read as input for the evaluated BF.

Insert in memory the final memory dump you expect on the evaluated file.
Example:
This an example of addition of a + 2
**sum_spec.bf**
```brainfuck
3!
++++++++++++++++++++++++++++++++++++++++++++++++++++
```
**sum.bf**
```brainfuck
,>++[<+>-]
```
Then run the command `bfrun test sum_spec.bf sum.bf`

(_If you want header comments on your spec file add it after the exclamation mark_)