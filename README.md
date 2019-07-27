# audit-resolve-core

Core modules for audit-resolve.json file and logic of its processing  
See also: [npm-audit-resolver]()

## Embedding

In a package manager or a tool responsible for downloading audit information from NPM and processing it, do the following to introduce audit-resolve.json support:

```js
const { dropResolvedActions } = require('audit-resolve-core/statusManager');
const audit = downoadAudit();
audit.actions = dropResolvedActions(audit.actions);
```

Decisions from audit-resolve.json file will be used to skip some of the items.

audit-resolve.json can be created manually or generated with a tool like [npm-audit-resolver]()

## audit-resolve.json manipulation

TBD

This library also provides support for anyone wanting to create content for audit-resolve.json files. 

See the interface exposed in 'audit-resolve-core/statusManager'