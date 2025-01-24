const fs = require('fs')
const path = require('path');
const os = require('os');
const { readFile } = require('fs/promises')
const { relative, parse } = require('path')
const {
  findFiles,
  processFrontmatter,
  term,
} = require('./utils.js')

const PROGRAM_NAME = 'leanpub'
const fileLimit = -1
const outputPath = 'e2e-test-validation-report.csv'
const verbose = false

function ci(fileReports) {
  let invalidFiles = 0
  let invalidTestNames = 0
  let invalidStepNames = 0

  fileReports.forEach((fileReport) => {
    //  If the file has all valid suites and steps, it passes.
    const isFileOK = fileReport.suites.every(
      (suite) => suite.isValidProtocolName && suite.isValidStepNames
    )
    if (isFileOK) {
      //  No need to log anything for files that are good, maybe in the future
      //  we have a verbose mode or whatever.
      //  console.log(`✅ test file passes: ${fileReport.relativePath}`);
      return
    }
    invalidFiles++

    //  Show the file path and it's issues.
    console.log(`${fileReport.relativePath}`)
    fileReport.suites.forEach((suite) => {
      if (!suite.isValidProtocolName) {
        console.log(term.fg.red, `  invalid name: ${suite.name}`, term.reset)
        invalidTestNames++
      }
      suite.invalidStepNames.forEach((invalidStepName) => {
        console.log(term.fg.red, `  invalid step name: ${invalidStepName}`, term.reset)
        invalidStepNames++
      })
    })
    console.log()
  })

  console.log(
    `\nE2E test validation complete: ${invalidFiles}/${fileReports.length} file(s) have errors\n`
  )
  console.log(`    ${invalidTestNames} invalid test name(s)`)
  console.log(`    ${invalidStepNames} invalid step name(s)`)

  //  Any errors and we fail.
  if (invalidFiles > 0) {
    process.exit(1)
  }
}

async function processFile(path, targetPath) {
  //  Load the file, preprocess the lines (which just joins up 'describe' and
  //  'it' lines that were split by the linter, making them easier to parse).
  const content = await readFile(path, 'utf8')
  const lines = content.split('\n')

  let isFrontMatter = false;
  let isManuscriptIgnore = false;
  let output = [];
  const frontmatterLines = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    //  Check if we are entering or leaving frontmatter.
    if (i === 0 && line === '---') {
      isFrontMatter = true;
    } else if (isFrontMatter === true && line === '---') {
      isFrontMatter = false;
      continue;
    }

    //  Check if we are explicitly ignoring a block in the manuscript (e.g.
    //  email signup forms or whatever).
    if (line === '<!-- manuscript:ignore:start -->') {
      isManuscriptIgnore = true;
    } else if (isManuscriptIgnore === true && line === '<!-- manuscript:ignore:end -->') {
      isManuscriptIgnore = false;
      continue;
    }
    
    //  If we are in frontmatter, don't add it to the manuscript.
    if (isFrontMatter) {
      frontmatterLines.push(line);
      continue;
    }
    if (isManuscriptIgnore) continue;

    output.push(line)
  }

  //  Process frontmatter.
  const fm = processFrontmatter(frontmatterLines);
  console.log('frontmatter', fm);
  output.unshift(`# ${fm.title.replace(/^'/, '').replace(/'$/, '')}\n`);

  //  Join the text.
  const text = output.join(os.EOL)
  const cleanText = text.replace(/^\s+/, '');

  fs.writeFileSync(targetPath, cleanText);
}

async function report(testFilePaths) {
  const fileReports = []
  for (let i = 0; i < testFilePaths.length; i++) {
    if (fileLimit !== -1 && i + 1 > fileLimit) {
      console.log(`Reached file limit of '${fileLimit}'`)
      break
    }
    const path = testFilePaths[i]
    try {
      const fileReport = await processFile(path)
      fileReports.push(fileReport)
    } catch (err) {
      console.error(`error processing file: ${path}`)
      console.error(err)
    }
  }

  return fileReports
}

async function writeCSVReport(fileReports) {
  fs.closeSync(fs.openSync(outputPath, 'w'))
  fs.appendFileSync(outputPath, `Path,ValidProtocol,ValidSteps,NumberOfSteps,Name\n`)
  fileReports.forEach((fileReport) => {
    fileReport.suites.forEach((suite) => {
      fs.appendFileSync(
        outputPath,
        `${fileReport.relativePath},${suite.isValidProtocolName},${suite.isValidStepNames},${suite.stepNames.length},${suite.name}\n`
      )
    })
  })
}

function help() {
  console.log(`${PROGRAM_NAME} usage:`)
  console.log(`  node ${PROGRAM_NAME} "root/for/docs" "output/folder"`)
}

async function program(argv) {
  //  Grab the path from the args.
  if (argv.length < 3) {
    help()
    process.exit(1)
  }
  const rootPath = argv[2]
  const targetPath = argv[3]

  //  Run the report, checking all files. Write to CSV.
  const files = findFiles(rootPath, /index\.md/)
  const flattenedFileNames = files.map(file => ({
    sourcePath: file,
    targetPath: path.join(targetPath, file.replace(rootPath, '').replaceAll(path.sep, '-'))
  }));


  results = flattenedFileNames;
  flattenedFileNames.forEach(file => {
    console.log(`${file.sourcePath}`);
    console.log(`--> ${file.targetPath}`);

    processFile(file.sourcePath, file.targetPath)
  })
  // const fileReports = await report(testFiles)
  // await writeCSVReport(fileReports)

  //  Run the CI command, which shows a summary and errors if we have any errors.
  // ci(fileReports)
}

program(process.argv).catch(console.error)
