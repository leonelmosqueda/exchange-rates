export default class Rates {
  /**
   * @param {Number} amount
   * @param {String} base
   * @param {String} date
   * @param {Object} rates  
  */

  constructor (amount, base, date, rates) {
    this.amount = amount;
    this.base = base;
    this.date = date;
    this.rates = rates;
  }
}