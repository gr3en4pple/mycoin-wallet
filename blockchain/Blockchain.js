const Block = require('./Block.js')
const Transaction = require('./Transaction.js')

const ProofOfStake = require('./consensus/proof-of-stake.js')

class Blockchain {
  constructor(_miningReward) {
    this.chain = [this.createGenesisBlock()]
    this.pendingTransactions = []
    this.miningReward = _miningReward ?? 100
  }

  createGenesisBlock() {
    return new Block('07/07/2024', 'GenesisBlock', '0')
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }

  generateBlock(minerAddress) {
    let block = new Block(
      Date.now(),
      this.pendingTransactions,
      this.getLatestBlock().hash
    )

    const algorithm = new ProofOfStake(block)
    block.validator = minerAddress
    block = algorithm.generateBlock()

    block.block = this.chain.length
    this.chain.push(block)
    this.pendingTransactions = [
      new Transaction(null, minerAddress, 'rewardValidator', this.miningReward)
    ]
  }

  createTransaction(transaction) {
    this.pendingTransactions.push(transaction)
  }

  getBalanceOfAddress(node) {
    let [address, balance] = node

    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount
        }
        if (trans.toAddress === address) {
          balance += trans.amount
        }
      }
    }

    return balance
  }

  validationCheck() {
    let validChain = true
    let consensusAlgorithm = null
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i]
      const previousBlock = this.chain[i - 1]

      const copiedBlock = Object.assign({}, currentBlock)

      consensusAlgorithm = new ProofOfStake(copiedBlock)

      if (currentBlock.hash !== consensusAlgorithm.calculateHash()) {
        console.log('Block ' + currentBlock.block + ' is invalid!')
        validChain = false
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        console.log('Block ' + currentBlock.block + ' is invalid!')
        validChain = false
      }
    }
    if (validChain) {
      console.log('Blockchain is valid.')
    }
  }
}

module.exports = Blockchain
