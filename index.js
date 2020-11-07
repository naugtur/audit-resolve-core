const statusManager = require('./statusManager')
const RESOLUTIONS = require('./resolutions/RESOLUTIONS')
const fileHandle = require('./auditFile/fileHandle')

module.exports = Object.assign({}, statusManager, { 
    RESOLUTIONS,
    validateResolveFile: fileHandle.validateResolveFile
})
