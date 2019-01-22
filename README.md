# Brainfuck CLI Interpreter
NodeJS Brainfuck console interpreter

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


## Future features
* Brainfuck Flat Interpretation (data oriented brainfuck)