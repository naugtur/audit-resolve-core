const assert = require("assert");
const RESOLUTIONS = require('../../resolutions/RESOLUTIONS')
const schema = require('../../auditFile/versions/v1.schema.json');

const decisions = Object.keys(RESOLUTIONS.reverseLookup);
const decisionsSchema = schema.properties.decisions.additionalProperties.properties.decision.enum;
decisions.sort();
decisionsSchema.sort();

assert.deepStrictEqual(decisions, decisionsSchema)

console.log("schema definition passed")