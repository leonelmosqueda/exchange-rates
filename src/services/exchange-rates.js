/**
 * @typedef {import('../entities/currencies.js').default} Currencies
 * @typedef {import('../entities/rates.js').default} Rates
*/

import {
  fetchCurrencies as fetchCurrenciesFromLocalStorage,
  fetchRates as fetchRatesFromLocalStorage,
  saveCurrencies,
  saveRates,
} from '../storage/exchange-rates.js';

import { 
  fetchCurrencies as fetchCurrenciesFromApi,
  fetchRates as fetchRatesFromApi,
} from '../api/exchange-rates.js';

import { generateUniqueKey, getEndpoint } from '../utilities/utilities.js';
import { mapCurrencies, mapRates } from '../mappers/exchange-rates.js';

/**
 * @returns {Promise<Currencies>} An array of Currencies.
 */

export async function fetchCurrencies() {
  try {
    return fetchCurrenciesFromLocalStorage();
  } catch (error) {
    const currenciesData = await fetchCurrenciesFromApi();
    const currencies = mapCurrencies(currenciesData);
    saveCurrencies(currencies);
    return currencies;
  }
}


/**
 * @param {Object} options - An object containing the following parameters:
 *   - {string} fromCurrency - The currency to convert from.
 *   - {string | null} toCurrency - The currency to convert to.
 *   - {number} amount - The amount to convert.
 *   - {string} date - The date of the conversion rates.
 * @return {Promise<Rates>} The conversion rates.
 */

export async function fetchRates({ fromCurrency, toCurrency, amount, date }) {
  const key = generateUniqueKey(fromCurrency, toCurrency, amount, date);

  let rates;
  try {
    rates = await fetchRatesFromLocalStorage(key);
  } catch (error) {
    const ratesData = await fetchRatesFromApi(
      getEndpoint(fromCurrency, toCurrency, amount, date)
    );
    rates = mapRates(ratesData);
    saveRates(key, rates);
  }

  return rates;
}
