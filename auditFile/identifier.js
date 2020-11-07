const assert = require('assert')

const longRandomRegex = /^[a-z0-9]{64}$/
// I'm still hoping this can be removed if audit results get it fixed for git packages
function pathCorruptionWorkaround (depPath) {
  const chunks = depPath.split('>')
  return chunks
    .map((c) => {
      if (c.match(longRandomRegex)) {
        return '00unidentified'
      } else {
        return c
      }
    })
    .join('>')
}

const buildKey = ({ id, path }) => {
  const ok = identify({ id, path })
  return `${ok.id}|${ok.path}`
}
const identify = ({ id, path }) => {
  assert.strictEqual(typeof id, 'number', 'Expected id to be a number')
  assert.strictEqual(typeof path, 'string', 'Expected path to be a string')
  path = pathCorruptionWorkaround(path)
  return { id, path }
}
module.exports = {
  buildKey,
  identify
}
