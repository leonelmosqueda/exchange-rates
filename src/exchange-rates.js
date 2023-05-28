import { fetchCurrencies, fetchRates } from './services/exchange-rates.js';
import { showCurrencyExchange } from './ui/exchange-results.js';
import { configureCurrencyOptions, createOptionElements, setCurrentDate, setMaxDate, validateForm } from './ui/inputs.js';
import { showAllCurrencyExchanges } from './ui/modal.js';
import { getCurrentDate, getEndpoint, getInputValues } from './utilities/utilities.js';

let currencies;

async function showResults(event) {
  event.preventDefault();
  if (!validateForm()) return;

  const inputValues = getInputValues();
  const rates = await fetchRates(inputValues);  

  if(inputValues.toCurrency === null) return showAllCurrencyExchanges(rates);
  showCurrencyExchange(rates);
}

export async function init() {
  const currentDate = getCurrentDate();
  setCurrentDate(currentDate);
  setMaxDate(currentDate);
  currencies = await fetchCurrencies();
  configureCurrencyOptions(createOptionElements(currencies));

  const $convertButton = document.querySelector('[data-button="convert"]');
  $convertButton.addEventListener('click', showResults);
}

export { currencies };
