import { currencies } from '../exchange-rates.js';

export const today = new Date();

/**
 * Returns the current date in the format 'YYYY-MM-DD'.
 *
 * @return {string} The current date.
 */
export function getCurrentDate() {
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * Retrieves the input values from the DOM.

 * @return {Object} An object containing the values of the input fields.
 */
export function getValues() {
  const fromCurrency = document.querySelector('#from-currency').value;
  const toCurrency = document.querySelector('#to-currency').value || null;
  const amount = document.querySelector('#amount').value;
  const date = document.querySelector('#date').value;

  return { fromCurrency, toCurrency, amount, date };
}

/**
 * Generates a unique key based on the provided parameters.
 *
 * @param {any} fromCurrency - The currency from which the conversion is made.
 * @param {any} toCurrency - The currency to which the conversion is made.
 * @param {any} amount - The amount to be converted.
 * @param {any} date - The date of the conversion.
 * @return {string} The generated unique key.
 */
export function generateUniqueKey(fromCurrency, toCurrency, amount, date) {
  return `${fromCurrency}-${toCurrency}-${amount}-${date}`;
}

/**
 * Generates an endpoint URL based on the provided parameters.
 *
 * @param {string} from - The starting point of the endpoint.
 * @param {string} to - (optional) The destination point of the endpoint.
 * @param {number} amount - The amount associated with the endpoint.
 * @param {string} date - The date associated with the endpoint.
 * @return {string} The generated endpoint URL.
 */
export function getEndpoint(from, to, amount, date) {
  const queryParams = {
    from,
    amount,
    date,
  };

  if (to) {
    queryParams.to = to;
  }

  const queryString = new URLSearchParams(queryParams).toString();

  return `/${date}?${queryString}`;
}

/**
 * Retrieves the name of a currency based on its symbol.
 *
 * @param {string} currencySymbol - The symbol of the currency.
 * @return {string} The name of the currency.
 */
export function getCurrencyName(currencySymbol) {
  const currencyIndex = currencies.codes.indexOf(currencySymbol);
  return currencies.names[currencyIndex];
}
