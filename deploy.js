const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode } = require('./compile')

const provider = new HDWalletProvider(process.env.MNEMONIC, process.env.INFURA_API)
const web3 = new Web3(provider)

// Write a helper method to allow us to use async/await notation
const deploy = async () => {
  const accounts = await web3.eth.getAccounts()
  console.log('Attempting to deploy from account', accounts[0])

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send({ gas: '1000000', from: accounts[0] })

  console.log('Contract deployed to', result.options.address)

  // To prevent a hanging deployment and gracefully exit
  provider.engine.stop()
}
deploy()
