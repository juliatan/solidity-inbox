// compile code will go here
const path = require('path')
const fs = require('fs')
const solc = require('solc')

// use path to ensure it works across windows, unix etc
// __dirname is the pwd provided by node
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol')
const source = fs.readFileSync(inboxPath, 'utf8')

// 1 is the number of contracts we want to compile
// From the return object of the compile, we only care about the contracts key
// Within this object, the 2 keys we're interested in are: bytecode and interface
// Export this so it can be used by other files
module.exports = solc.compile(source, 1).contracts[':Inbox']
