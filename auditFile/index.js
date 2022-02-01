const debug = require('debug')('audit-resolve-core')
const auditFile = require('./fileHandle')
const RESOLUTIONS = require('../resolutions/RESOLUTIONS')
const { buildKey } = require('./identifier')
let decisionsData = null
let rules = {}

function load (pathOverride) {
  debug('load')
  if (decisionsData) {
    return
  }
  decisionsData = {} // in case loading fails, have something valid to extend and save
  try {
    const file = auditFile.load(pathOverride)
    debug('resolve file loaded', file)
    rules = file.rules
    decisionsData = file.decisions
  } catch (e) {
    debug('error loading resolve file', e)
  }
}

module.exports = {
  load,
  getRules () {
    // naive clone is enough to make you, dear contributor, treat this as readonly
    return Object.assign({ignoreConfig:{}}, rules)
  },
  flush () {
    auditFile.save({
      decisions: decisionsData,
      rules
    })
  },
  set ({ id, path }, { resolution, reason, expiresAt }) {
    if (!RESOLUTIONS.reverseLookup[resolution]) {
      throw Error(`invalid resolution ${resolution}`)
    }
    const key = buildKey({ id, path })
    load()
    const payload = {
      decision: resolution,
      madeAt: Date.now()
    }
    if (reason) {
      payload.reason = reason
    }
    if (expiresAt) {
      payload.expiresAt = expiresAt
    }
    return (decisionsData[key] = payload)
  },
  get ({ id, path }) {
    const key = buildKey({ id, path })
    load()
    return decisionsData[key]
  }
}
