const statusManager = require('./statusManager')
const RESOLUTIONS = require('./resolutions/RESOLUTIONS')
const fileHandle = require('./auditFile/fileHandle')
const identifier = require('./auditFile/identifier')

module.exports = Object.assign({}, statusManager, {
  RESOLUTIONS,
  validateResolveFile: fileHandle.validateResolveFile,
  identify: identifier.identify

})
