const assert = require("assert");
const api = require("../../index");

const exampleItem = { id: 123, path: "aa>bb>cc" };
assert(api.RESOLUTIONS);

assert(api.validateResolveFile);

assert(api.identify);
assert(api.checkResolution);
assert.doesNotThrow(() => {
  api.checkResolution(api.identify( exampleItem ));
});
assert(api.setResolution);
assert(api.addResolutionStatusToItem);

console.log('embedder passed')
