class Transaction {
  constructor(fromAddress, toAddress, functionType, amount) {
    this.fromAddress = fromAddress
    this.toAddress = toAddress
    this.amount = amount
    this.functionType = functionType
  }
}

module.exports = Transaction
