const VALIDATIONS = require('./VALIDATIONS')

module.exports = function decision2validation (vuln, rules) {
  if (!vuln) {
    return undefined
  }
  if (rules.requireReason === true) {
    if (vuln.reason === "" || vuln.reason === null || vuln.reason === undefined) {
      return VALIDATIONS.REASON_MISSING
    }
    if (rules.requireReasonMatch) {
      let requireReasonRe;
      try {
        requireReasonRe = new RegExp(rules.requireReasonMatch)
      } catch (err) {
        throw Error(`audit-resolve "rules.requireReasonMatch" must be a valid JS regex. Got ${rules.requireReasonMatch}`)
      }
      if (!vuln.reason.match(requireReasonRe)) {
        return VALIDATIONS.REASON_MISMATCH
      }
    }
  }
  return undefined
}
