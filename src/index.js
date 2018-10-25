const yargs = require('yargs')
const Server = require('./app')

const argv = yargs
  .usage('anywhere [options]')
  .option('p', {
    alias: 'port',
    describe: '端口号',
    default: 3333
  })
  .option('h', {
    alias: 'host',
    describe: 'host',
    default: '127.0.0.1',
  })
  .option('d', {
    alias: 'root',
    describe: '根文件',
    default: process.cwd()
  })
  .version()
  .alias('v', 'version')
  .help()
  .argv

const server = new Server(argv)
server.start()