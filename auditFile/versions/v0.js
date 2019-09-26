const RESOLUTIONS = require('../../resolutions/RESOLUTIONS')
const MILIS24H = 1000 * 60 * 60 * 24

module.exports = {
    schema: {
        type: "object",
        "additionalProperties": {
            "type": "object"
        }
    },
    extract(data) {
        return {
            rules: {},
            decisions: Object.keys(data).reduce((acc, key) => {
                acc[key] = { madeAt: 0 }
                if (data[key].postpone) {
                    acc[key].decision = RESOLUTIONS.POSTPONE
                    acc[key].madeAt = data[key].postpone - MILIS24H
                }
                if (data[key].remind) {
                    acc[key].decision = RESOLUTIONS.POSTPONE
                    acc[key].madeAt = data[key].remind - MILIS24H
                }
                if (data[key].ignore) {
                    acc[key].decision = RESOLUTIONS.IGNORE
                }
                if (data[key].fix) {
                    acc[key].decision = RESOLUTIONS.FIX
                }
                return acc
            }, {})
        }
    }
}