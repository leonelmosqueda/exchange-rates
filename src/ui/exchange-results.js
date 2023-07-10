const $resultElement = document.querySelector('#result');

const $baseAmount = document.querySelector('[data-base="amount"]');
const $baseSymbol = document.querySelector('[data-base="symbol"]');
const $convertedValue = document.querySelector('[data-converted="value"]');
const $convertedSymbol = document.querySelector('[data-converted="symbol"]'); 

function hideResult() {
  $resultElement.classList.add('hidden');
}

function updateConversion(data) {
  $baseAmount.textContent = data.amount;
  $baseSymbol.textContent = data.base;

  const rates = Object.entries(data.rates);
  const convertedValues = rates.map(([_, value]) => value);
  const convertedSymbols = rates.map(([symbol, _]) => symbol);

  $convertedValue.textContent = convertedValues;
  $convertedSymbol.textContent = convertedSymbols;
}

function showResult() {
  $resultElement.classList.remove('hidden');
}

export function displayConversion(data) {
  hideResult();
  updateConversion(data);
  showResult();
}
