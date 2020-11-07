const debug = require('debug')('audit-resolve-core')
const argv = require('../arguments')
const Djv = require('djv')
const path = require('path')
const fs = require('fs')
const FILE = require('./FILE')
const { printV1MigrationNotes } = require('../views/main')
const versions = {
  0: require('./versions/v0'),
  1: require('./versions/v1')
}

function defaultFilePath (pathOverride) {
  return pathOverride || path.resolve(argv.get().prefix || '.', FILE.FILENAME)
}

function resolutionFilePath (pathOverride) {
  const filePath1 = defaultFilePath(pathOverride)

  if (fs.existsSync(filePath1)) {
    return filePath1
  }

  const filePath2 = path.resolve(argv.get().prefix || '.', FILE.FILENAME_DEPRECATED)
  if (fs.existsSync(filePath2)) {
    printV1MigrationNotes()
    return filePath2
  }

  throw Error(`Could not find the resolutions file. Expected ${filePath1}`)
}

function validate (JSONSchema, data) {
  const env = new Djv()
  env.addSchema('resolve', JSONSchema)
  const result = env.validate('resolve', data)
  if (result) {
    throw Error(`Invalid audit-resolve file. ${JSON.stringify(result, null, 2)}`)
  }
}
function readAndValidate (pathOverride) {
  const filePath = resolutionFilePath(pathOverride)
  debug('loading from ', filePath)
  const rawdata = fs.readFileSync(filePath)
  const data = JSON.parse(rawdata)
  let version = 0
  if (data.version) {
    version = +data.version
  }
  if (!versions[version]) {
    throw Error(`Unrecognized ${FILE.FILENAME} content version ${version}`)
  }
  validate(versions[version].schema, data)
  return data
}
function parseResolutionsData (data) {
  const version = +data.version
  return versions[version].extract(data)
}

module.exports = {
  load (pathOverride) {
    const data = readAndValidate(pathOverride)
    return parseResolutionsData(data)
  },
  save ({ decisions, rules }, pathOverride) {
    const wrappedData = {
      decisions,
      rules,
      version: 1
    }
    validate(versions[1].schema, wrappedData)
    fs.writeFileSync(defaultFilePath(pathOverride), JSON.stringify(wrappedData, null, 2))
  },
  validateResolveFile (pathOverride) {
    return readAndValidate(pathOverride)
  }
}
