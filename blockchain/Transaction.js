class Transaction {
  constructor(fromAddress, toAddress, functionType, amount) {
    this.fromAddress = fromAddress
    this.toAddress = toAddress
    this.amount = amount
    this.functionType = functionType
    this.date = new Date().getTime()
  }
}

module.exports = Transaction
