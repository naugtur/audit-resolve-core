const statusManager = require('./statusManager')
const RESOLUTIONS = require('./resolutions/RESOLUTIONS')
const VALIDATIONS = require('./validations/VALIDATIONS')
const fileHandle = require('./auditFile/fileHandle')
const identifier = require('./auditFile/identifier')

module.exports = Object.assign({}, statusManager, {
  RESOLUTIONS,
  VALIDATIONS,
  validateResolveFile: fileHandle.validateResolveFile,
  identify: identifier.identify
})
