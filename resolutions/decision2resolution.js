const RESOLUTIONS = require('./RESOLUTIONS')
const MILIS24H = 1000 * 60 * 60 * 24

module.exports = function decision2resolution (item, rules) {
  if (!item) {
    return RESOLUTIONS.NONE
  }
  if (rules.requireReason === true) {
    if (item.reason === "" || item.reason === null || item.reason === undefined) {
      return RESOLUTIONS.REASON_MISSING
    }
    if (rules.requireReasonMatch) {
      let requireReasonRe;
      try {
        requireReasonRe = new RegExp(rules.requireReasonMatch)
      } catch (err) {
        throw Error(`audit-resolve "rules.requireReasonMatch" must be a valid regex. Got ${rules.requireReasonMatch}`)
      }
      if (!item.reason.match(requireReasonRe)) {
        return RESOLUTIONS.REASON_MISMATCH
      }
    }
  }
  if (item.expiresAt < Date.now()) {
    return RESOLUTIONS.EXPIRED
  }
  if (item.decision === RESOLUTIONS.POSTPONE && Date.now() > item.madeAt + MILIS24H) {
    return RESOLUTIONS.EXPIRED
  }
  return RESOLUTIONS[RESOLUTIONS.reverseLookup[item.decision]] || RESOLUTIONS.NONE
}
