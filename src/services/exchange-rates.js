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


export async function fetchCurrencies() {
  try {
    return fetchCurrenciesFromLocalStorage();
  } catch (error) {
    const currencies = await fetchCurrenciesFromApi();
    saveCurrencies(currencies);
    return currencies;
  }
}

export async function fetchRates({ fromCurrency, toCurrency, amount, date}) {
  const key = generateUniqueKey(fromCurrency, toCurrency, amount, date);
  try {
    return fetchRatesFromLocalStorage(key);
  } catch (error) {
    const rates = await fetchRatesFromApi(getEndpoint(fromCurrency, toCurrency, amount, date));
    saveRates(key, rates);
    return rates;
  }
}
