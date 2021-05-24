const auditFile = require('./auditFile')
const RESOLUTIONS = require('./resolutions/RESOLUTIONS')

const decision2resolution = require('./resolutions/decision2resolution')

/**
 *
 *
 * @param {Array<{id: string, path:string}>} items
 * @param { resolution: string, reason?:string, expiresAt:number }
 * @returns void
 */
function saveResolution (items, { resolution, reason, expiresAt }) {
  // default expiry rules
  if (!expiresAt && resolution === RESOLUTIONS.IGNORE && auditFile.getRules().ignoreConfig.ignoreExpiresInDays) {
    expiresAt = auditFile.getRules().ignoreConfig.ignoreExpiresInDays * 24 * 60 * 60 * 1000
  }
  items.map(item => auditFile.set(
    { id: item.id, path: item.path },
    { resolution, reason, expiresAt }
  ))

  return auditFile.flush()
}

/**
 *
 * @param {string} identifierOrItem.id
 * @param {string} identifierOrItem.path
 * @returns { resolution: string, reason?:string, expiresAt:number }
 */
function get (identifierOrItem) {
  return auditFile.get(identifierOrItem)
}

/**
 *
 * @param {string} identifierOrItem.id
 * @param {string} identifierOrItem.path
 * @returns {string} resolution
 */
function getResolution ({ id, path }) {
  const data = auditFile.get({ id, path })
  return decision2resolution(data)
}

/**
 *
 *
 * @param {string} identifierOrItem.id
 * @param {string} identifierOrItem.path
 * @param {string} resolution.resolution
 * @param [string] resolution.reason
 * @param [number] resolution.expiresAt
 * @returns
 */
function set (identifierOrItem, resolution) {
  return auditFile.set(identifierOrItem, resolution)
}

module.exports = {
  saveResolution,
  getResolution,
  get,
  set
}
