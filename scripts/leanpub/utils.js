const fs = require('fs')
const path = require('path')

//  ASCII control codes for terminal formatting.
const term = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',

  fg: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    gray: '\x1b[90m',
    crimson: '\x1b[38m' // Scarlet
  },
  bg: {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m',
    gray: '\x1b[100m',
    crimson: '\x1b[48m'
  }
}

function findFiles(root, pattern) {
  let results = []

  fs.readdirSync(root).map((file) => {
    const fullPath = path.join(root, file)
    if (fs.lstatSync(fullPath).isDirectory()) {
      results = results.concat(findFiles(fullPath, pattern))
    } else if (pattern.test(fullPath)) {
      results.push(fullPath)
    }
  })
  return results
}

function processFrontmatter(lines) {
  return lines.reduce((agg, line) => {
    const [k, v] = line.split(': ');
    agg[k] = v;
    return agg;
  }, {});
}

module.exports = {
  term,
  findFiles,
  processFrontmatter,
}
