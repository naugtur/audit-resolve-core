const auditFile = require('./auditFile')
const RESOLUTIONS = require('./resolutions/RESOLUTIONS')

const { printSkipping } = require('./views/main')

function addStatusToAction (action) {
  let unresolved = false
  action.resolves.map(re => {
    const status = auditFile.get({ id: re.id, path: re.path })
    if (status) {
      re.decision = status
      if (status === RESOLUTIONS.FIX) {
        // should have been fixed!
        unresolved = true
      }
      if (status === RESOLUTIONS.EXPIRED) {
        unresolved = true
      }
      if (status === RESOLUTIONS.NONE) {
        unresolved = true
      }
    } else {
      unresolved = true
    }
    return re
  })
  action.isMarkedResolved = !unresolved
  return action
}

function saveResolution (action, { resolution, reason, expiresAt }) {
  // default expiry rules
  if (!expiresAt && resolution === RESOLUTIONS.IGNORE && auditFile.getRules().ignoreConfig.ignoreExpiresInDays) {
    expiresAt = auditFile.getRules().ignoreConfig.ignoreExpiresInDays * 24 * 60 * 60 * 1000
  }
  action.resolves.map(re => auditFile.set(
    { id: re.id, path: re.path },
    { resolution, reason, expiresAt }
  ))

  return auditFile.flush()
}

function checkResolution (identifierOrItem) {
  return auditFile.get(identifierOrItem)
}
function setResolution (identifierOrItem, resolution) {
  return auditFile.set(identifierOrItem, resolution)
}

function dropResolvedActions (actions) {
  if (!actions) {
    return actions
  }
  return actions
    .map(addStatusToAction)
    .filter(action => {
      if (action.isMarkedResolved) {
        printSkipping(action)
      }
      return !action.isMarkedResolved
    })
}

module.exports = {
  dropResolvedActions,
  addStatusToAction,
  saveResolution,
  // npm audit's action agnostic API
  addResolutionStatusToItem: addStatusToAction,
  checkResolution,
  setResolution
}
