const path = require('path')
const mimeTypes = {
  'css': 'text/css',
  'html': 'text/html',
  'xml': 'text/xml',
  'gif': 'image/gif',
  'ico': 'image/x-icon',
  'js': 'application/javascript',
  'json': 'application/json',
  'png': 'image/png',
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpeg',
  'pdf': 'application/pdf',
  'svg': 'image/svg+xml',
  'txt': 'text/plain',
  'wma': 'video/x-ms-wma',
  'wmv': 'video/x-ms-wmv'
}

module.exports = (filePath) => {
  let ext = path.extname(filePath).split('.').pop().toLowerCase()

  if (!ext) {
    ext = filePath
  }
  return mimeTypes[ext] || mimeTypes['txt']
}