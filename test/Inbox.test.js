// Testing packages used: mocha, ganache-cli, web3
const assert = require('assert') // provided by node
const ganache = require('ganache-cli')
const Web3 = require('web3') // note that Web3 is capitalized. We're importing a construction function. We will use this to create an instance of Web3.

// The reason why we might want to have multiple instances of Web3 is to connect to different networks.
// More likely than not, we will only be connecting to one network.
const web3 = new Web3(ganache.provider())

// run test suite: npm run test
class Car {
  park() {
    return 'stopped'
  }

  drive() {
    return 'vroom'
  }
}

let car

beforeEach(() => {
  car = new Car()
})

describe('Car', () => {
  it('can park', () => {
    assert.equal(car.park(), 'stopped')
  })

  it('can drive', () => {
    assert.equal(car.drive(), 'vroom')
  })
})
