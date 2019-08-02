const path = require("path");
const auditFile = require("../../auditFile/index")

auditFile.load(path.resolve(__dirname,"./v0.json"))
auditFile.flush()

console.log("migration passed")