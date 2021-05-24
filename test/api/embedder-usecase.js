const assert = require('assert')
const api = require('../../index')

const exampleItem = { id: 123, path: 'aa>bb>cc' }
assert(api.RESOLUTIONS)

assert(api.validateResolveFile)

assert(api.identify)
assert(api.getResolution)
assert.doesNotThrow(() => {
  api.getResolution(api.identify(exampleItem))
})
assert(api.saveResolution)
assert(api.get)
assert(api.set)

console.log('embedder passed')
