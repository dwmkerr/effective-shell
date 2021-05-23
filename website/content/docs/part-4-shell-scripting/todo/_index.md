## Shell Script Options

## Debugging Shell Scripts

## A Basic Shell Script Template

## TODO

interactive vs non interactive shells - running a shell script is a good example because it is non interactive (i.e. no aliases, no history, etc)


 * Case statements

## Variables

- `declare`
- `local`
- `builtin`
- `unset`
- bash `declare -p` to show the contents of an array https://www.baeldung.com/linux/reading-output-into-array

## Extended Globbing

Useful for file matching vs `find`


# Parameters - Quick Reference


| Value | Usage |
`$#`
`$*`
`$@`
`$@:2:3`


---

#### Chapter 22 - Functions, Parameters and Error Handling

https://www.leadingagile.com/2018/10/unit-testing-shell-scriptspart-one/

Use the `rcut` function as an example

# TODO

- Show how to use `getopts`
- Show how to use `declare -f` to get the list of current functions
- Show how to colour output.
- Show how to use options (with `-i` for interactive)
- pwd -P shows the physical path, great if you are in a symlink
- Parameter special values greater than 9 are ${10}, ${11}, etc
- Getopts for the common script
- set -x for tracing
- Loops: We need to show C Style loops: https://linuxize.com/post/bash-for-loop/
- Loops: We should show how to loop over a sequence (e.g. `for i in {1..3}`)


