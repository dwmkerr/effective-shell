| Variable           | Description                                                                                   |
|--------------------|-----------------------------------------------------------------------------------------------|
| `$$`               | This is the process ID of the script itself.                                                  |
| `$0`               | The first parameter to the shell, which is typically the path of the shell itself.            |
| `$1`               | The first parameter                                                                           |
| `$2`               | The second parameter                                                                          |
| `${11}`            | The 11th parameter - if the parameter is more than one digit you must surround it with braces |
| `$#`               | The number of parameters                                                                      |
| `$@`               | The full set of parameters as an array                                                        |
| `$*`               | The full set of parameters as a string separated by the first value in the `$IFS` variable    |
| `${@:start:count}` | A subset of 'count' parameters starting at parameter number 'start'                           |
| `$?`               | The status code of the most recently called command.                                          |

## TODO

Need to update Chapter 19 to link to this.
