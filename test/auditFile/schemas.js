const path = require('path')
const assert = require('assert')
const auditFile = require('../../auditFile/fileHandle')

auditFile.load(path.resolve(__dirname, './v1ok.json'))

auditFile.load(path.resolve(__dirname, './v1reasonOk.json'))

auditFile.load(path.resolve(__dirname, './v1reasonOkRegex.json'))

assert.throws(() => {
  auditFile.load(path.resolve(__dirname, './v1reasonKoEmptyString.json'))
})

assert.throws(() => {
  auditFile.load(path.resolve(__dirname, './v1reasonKoLacking.json'))
})

assert.throws(() => {
  auditFile.load(path.resolve(__dirname, './v1reasonKoRegex.json'))
})

assert.throws(() => {
  auditFile.load(path.resolve(__dirname, './v1wrong.json'))
})

console.log('schemas passed')
