const http = require('http')
const path = require('path')
const conf = require('./config/defaultConfig')
const route = require('./helper/routes')
const openUrl = require('./helper/open')

class Server {
  constructor(config) {
    this.conf = Object.assign({}, conf, config)
  }

  start() {
    const server = http.createServer((req, res) => {
      const filePath = path.join(this.conf.root, req.url)
      route(req, res, filePath, this.conf)
    })
    
    server.listen(this.conf.port, this.conf.host, () => {
      const addr = `http://${this.conf.host}:${this.conf.port}`
      console.info('Server started at ' + addr)
      openUrl(addr)
    })
  }
}

module.exports = Server