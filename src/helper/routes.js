const promisify = require('util').promisify
const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars')
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const mimeType = require('./mime')
const compress = require('./compress')
const isFresh = require('./cache')

const tplPath = path.join(__dirname, '../template/dir.tpl')
const source = fs.readFileSync(tplPath)
const template = Handlebars.compile(source.toString())

module.exports = async (req, res, filePath, conf) => {
  try {
    const stats = await stat(filePath)
    if (stats.isFile()) {
      const contentType = mimeType(filePath)

      if (isFresh(stats, req, res)) {
        res.statusCode = 304
        res.end()
        return
      }

      res.statusCode = 200
      res.setHeader('Content-Type', contentType)
      let rs = fs.createReadStream(filePath)
      if (filePath.match(conf.compress)) {
        rs = compress(rs, req, res)
      }
      rs.pipe(res)
    } else if (stats.isDirectory()) {
      const files = await readdir(filePath)
      const dir = path.relative(conf.root, filePath)
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      const data = {
        title: path.basename(filePath),
        dir: dir ? `/${dir}` : '',
        files: files.map(file => {
          return {
            file,
            icon: mimeType(file)
          }
        })
      }
      res.end(template(data))
    }
  } catch (error) {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end(`${filePath}未找到\n ${error.message}`)
    console.error(error)
  }
}