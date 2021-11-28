// Testing packages used: mocha, ganache-cli, web3
const assert = require('assert') // provided by node
const ganache = require('ganache-cli')
const Web3 = require('web3') // note that Web3 is capitalized. We're importing a construction function. We will use this to create an instance of Web3.

// The reason why we might want to have multiple instances of Web3 is to connect to different networks.
// More likely than not, we will only be connecting to one network.
const web3 = new Web3(ganache.provider())
const { abi, evm } = require('../compile')

// run test suite: npm run test

// Mocha starts -> deploy new contract -> manipulate contract -> make assertion about contract -> loop deploy new contract
// beforeEach, we should deploy a new contract (need a sender account)
// ganache automatically creates 10 sender accounts for us, that are unlocked (makes our lives easier)

let accounts
let inbox

beforeEach(async () => {
  // Get list of all accounts
  // Get eth module from web3 (to do with ethereum)
  // Pretty much all functions in web3 are asynchronous.
  accounts = await web3.eth.getAccounts()

  // Use one of those accounts to deploy the contract
  // Contract is capitalized.
  inbox = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ['Hi there!'] }) // our Inbox contract needs to be initialized with a message
    .send({ from: accounts[0], gas: '1000000' })
})

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address) // checks that address is a defined / truthy value
  })

  it('creates an instance with an initial message', async () => {
    const message = await inbox.methods.message().call()
    assert.equal(message, 'Hi there!')
  })

  it('can change the message', async () => {
    // send arguments implies who is paying for this transaction
    // return value is the transaction hash. If it fails, this will throw an error.
    await inbox.methods.setMessage('bye').send({ from: accounts[0] })
    const message = await inbox.methods.message().call()
    assert.equal(message, 'bye')
  })
})
