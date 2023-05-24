const $result = document.querySelector('#result');

const $baseAmount = document.querySelector('[data-base="amount"]');
const $baseSymbol = document.querySelector('[data-base="symbol"]');
const $convertedValue = document.querySelector('[data-converted="value"]');
const $convertedSymbol = document.querySelector('[data-converted="symbol"]'); 

function hiddenResults() {
  $result.classList.add('hidden');
}

function setCurrencyExchange(data) {
  $baseAmount.textContent = data.amount;
  $baseSymbol.textContent = data.base;

  $convertedValue.textContent = Object.values(Object.values(data.rates));
  $convertedSymbol.textContent = Object.keys(data.rates);
}

function showResults() {
  $result.classList.remove('hidden');
}

export function showCurrencyExchange(data) {
  hiddenResults();
  setCurrencyExchange(data);
  showResults();
}
