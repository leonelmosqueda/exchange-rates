import Currencies from '../entities/currencies.js';
import Rates from '../entities/rates.js';

/**
 * @param {Object} apiData - The API data containing currency codes and names.
 * @returns {Currencies} An instance of the Currencies class.
 */

export function mapCurrencies(apiData) {
  const currencyCodes = Object.keys(apiData);
  const currencyNames = Object.values(apiData);

  return new Currencies(currencyCodes, currencyNames);
}

/**
 * @param {Object} apiData - The API data containing amount, base, date, and rates.
 * @return {Rates} The Rates object mapped from the API data.
 */
export function mapRates(apiData) {
  const { amount, base, date, rates } = apiData;
  return new Rates(amount, base, date, rates);
}
