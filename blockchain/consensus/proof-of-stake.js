const { SHA256 } = require('@/utils')

class ProofOfStake {
  constructor(block) {
    this.block = block
    this.validators = []
  }

  /**
   * Only for demonstration purposes.
   * Usually a node has no balance in the begining.
   */
  static setBalanceForNodes(nodes) {
    nodes.forEach(function (node) {
      node[1] = 1000
    })
    return nodes
  }

  /**
   * In PoS, anybody can become a validator by paying a fee
   *
   * @returns {Array} node with reduced balance
   */
  createValidator(node, stake) {
    this.validators.push([node[0], stake])
    return [node[0], node[1] - stake]
  }

  createValidators(listNode, listStake) {
    return listNode?.map((node, index) =>
      this.createValidator(node, listStake[index])
    )
  }

  /**
   * Stake more
   *
   * @returns {Array} node with reduced balance
   */
  stake(node, stake) {
    const validatorIndex = this.validators.findIndex(
      ([address]) => address === node[0]
    )

    if (validatorIndex === -1) return this.createValidator(node, stake)
    this.validators[validatorIndex][1] += +stake
    return [node[0], node[1] - stake]
  }

  getStakedAmount(node) {
    const validatorIndex = this.validators.findIndex(
      ([address]) => address === node
    )
    if(validatorIndex === -1) return 0
    return this.validators[validatorIndex][1]
  }

  calculateHash() {
    return SHA256(
      this.block.previousHash +
        this.block.timestamp +
        JSON.stringify(this.block.transactions) +
        this.block.validator
    ).toString()
  }

  getValidatorWithMaxStake() {
    let maxStake = ['', 0]
    this.validators.forEach(function (element) {
      if (element[1] > maxStake[1]) {
        maxStake = element
      }
    })
    return maxStake
  }

  generateBlock() {
    this.block.hash = this.calculateHash()
    return this.block
  }
}

module.exports = ProofOfStake
