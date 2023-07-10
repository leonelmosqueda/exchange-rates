import { fetchCurrencies, fetchRates } from './services/exchange-rates.js';
import { displayConversion } from './ui/exchange-results.js';
import { configureCurrencyOptions, createOptions, setCurrentDate, setMaxDate, isFormValid } from './ui/inputs.js';
import { displayCurrencyExchange } from './ui/modal.js';
import { getCurrentDate, getValues } from './utilities/utilities.js';

let currencies;

async function showResults(event) {
  event.preventDefault();

  if (!isFormValid()) {
    return;
  }

  const values = getValues();
  const rates = await fetchRates(values);

  if (values.toCurrency === null) {
    displayCurrencyExchange(rates);
  } else {
    displayConversion(rates);
  }
}

export async function init() {
  const date = getCurrentDate();
  setCurrentDate(date);
  setMaxDate(date);

  currencies = await fetchCurrencies();
  configureCurrencyOptions(createOptions(currencies));

  const $convertButton = document.querySelector('[data-button="convert"]');
  $convertButton.addEventListener('click', showResults);
}

export { currencies };
