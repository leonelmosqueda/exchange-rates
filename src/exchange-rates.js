import { fetchCurrencies, fetchRates } from './api/exchange-rates.js';
import { showCurrencyExchange } from './ui/exchange-results.js';
import { configureCurrencyOptions, createOptionElements, setCurrentDate, setMaxDate, validateForm } from './ui/inputs.js';
import { showAllCurrencyExchanges } from './ui/modal.js';
import { getCurrentDate, getEndpoint, getInputValues } from './utilities/utilities.js';

let currencies;

async function update(event) {
  event.preventDefault();
  if (!validateForm()) return;

  const { fromCurrency, toCurrency, amount, date } = getInputValues();
  
  const endpoint = getEndpoint(fromCurrency, toCurrency, amount, date);
  const rates = await fetchRates(endpoint);
  if(!toCurrency) return showAllCurrencyExchanges(rates);
  showCurrencyExchange(rates);
}

export async function init() {
  const currentDate = getCurrentDate();
  setCurrentDate(currentDate);
  setMaxDate(currentDate);
  currencies = await fetchCurrencies();
  configureCurrencyOptions(createOptionElements(currencies));

  const $convertButton = document.querySelector('[data-button="convert"]');
  $convertButton.addEventListener('click', update);
}

export { currencies };
