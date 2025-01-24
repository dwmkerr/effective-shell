const fs = require('fs');
const http = require('http');
const path = require('path');

//  A helper to write a log message with a given timestamp and level.
function writeLog(timestamp, level, message) {
  console.log(`${timestamp.toISOString()}: ${level} - ${message}`);
}

//  A helper object which lets you log at given levels.
//  This let's us call:
//    log.warning('some message');
//    log.error('something else');
//  and so on.
const levels = ['debug', 'info', 'warning', 'error'];
const log = levels.reduce((logObject, level) => {
  logObject[level] = (message) => writeLog(new Date(), level, message);
  return logObject;
}, {});

//  Helper to return an optional numeric environment variable or the default.
function getOptionalEnvInt(name, defaultValue) {
  const val = process.env[name];
  if (!val) return defaultValue;
  const intVal = parseInt(val, 10);
  if (isNaN(intVal)) throw new Error(`Unable to parse environment variable named '${name}' with value '${val}' into an integer`);
  return intVal;
}

//  Set the basic server configuration, which can be overwritten with
//  environment variables.
const config = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || getOptionalEnvInt('PORT', 8080),
  root: process.env.ROOT || process.cwd(),
  defaultPage: 'index.html',
};

//  This handler function will serve static files.
const requestHandler = (req, res) => {
  //  Log some details of the request.
  log.info(`Request: ${req.method} ${req.url}`);

  //  If the url ends in a slash, apply the 'default page' value.
  let { url } = req;
  if (/\/$/.test(url)) {
    log.debug(`Adding default page value '${config.defaultPage}' to url '${url}'`);
    url = `${url}${config.defaultPage}`;
  }

  //  Try and read the file. If it doesn't exist, bomb.
  filePath = path.join(config.root, url);
  fs.readFile(filePath, function (err,data) {
    if (err) {
      if (err.code === 'ENOENT') {
        log.warning(`File '${filePath}' not found, returning a 404...`);
        res.writeHead(404);
        return res.end(JSON.stringify({ error: 'Not found', message: 'File not found' }));
      }
      log.error(`Unhandled error ${err.code} trying to read '${filePath}', returning a 500`);
      res.writeHead(500);
      return res.end(JSON.stringify({ error: 'Server error', message: 'Internal Server Error' }));
    }

    //  Return the file contents.
    log.info(`Serving file '${filePath}'...`);
    res.writeHead(200);
    res.end(data);
  });
}

//  Put our startup logic into a function, in case we want to extract it later on.
function main() {
  //  Log some startup info and the config.
  log.info('web-server starting up...');
  log.info(`Configuration provided is: ${JSON.stringify(config, null, 2)}`);

  //  Create the server, providing the handler function.
  const httpServer = http.createServer(requestHandler);
  httpServer.listen({ host: config.host, port: config.port });
  log.info(`Server running on: ${config.host}:${config.port}`);
}
main();
