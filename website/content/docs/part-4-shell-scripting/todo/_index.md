
## Shell Script Options

## Debugging Shell Scripts

## A Basic Shell Script Template

## TODO

interactive vs non interactive shells - running a shell script is a good example because it is non interactive (i.e. no aliases, no history, etc)


 * Case statements


## Appendix - Z-Shell

 Strictly, the `in <words>` is not required, if it is omitted then then `in "$@"` is assumed. I do _not_ recommend omitting the `in <words>` - it will be confusing to readers!

## Variables

- `declare`
- `local`
- `builtin`
- `unset`
- bash `declare -p` to show the contents of an array https://www.baeldung.com/linux/reading-output-into-array

## Extended Globbing

Useful for file matching vs `find`
