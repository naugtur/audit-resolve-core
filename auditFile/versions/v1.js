const schema = require('./v1.schema.json');

module.exports = {
    schema,
    extract(data) {
        return {
            decisions: data.decisions,
            rules: data.rules
        }
    }
}