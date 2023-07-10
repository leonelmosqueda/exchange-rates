import { currencies } from '../exchange-rates.js';
import { getCurrencyName } from '../utilities/utilities.js';

const $modalElement = document.querySelector('#modal');
const $overlayElement = document.querySelector('#overlay');
const $amountHeader = document.querySelector('#amount-header');
const $dateHeader = document.querySelector('#date-header');
const $list = document.querySelector('#list');

function clearResults() {
  const $resultElement = document.querySelector('#result');
  $resultElement.classList.add('hidden');
}

function clearModal() {
  const $listItems = document.querySelectorAll('li');

  $amountHeader.textContent = '';
  $dateHeader.textContent = '';
  $listItems.forEach((item) => item.remove());
}

function setHeaderInfo(data) {
  const { amount, base, date } = data;
  $amountHeader.textContent = `${amount} ${base}`;
  $dateHeader.textContent = `${date}`;
}

function createListItem(currencyValue, currencySymbol) {
  const $listItem = document.createElement('li');
  $listItem.textContent = `${currencyValue} ${currencySymbol} (${getCurrencyName(currencySymbol)})`;
  return $listItem;
}

function setCurrencyExchange(data) {
  const rates = data.rates;
  const currencyValues = Object.values(rates);
  const currencySymbols = Object.keys(rates);
  
  for (let i = 0; i < currencySymbols.length; i += 1) {
    const listItem = createListItem(currencyValues[i], currencySymbols[i]);
    $list.appendChild(listItem);
  }
}

function openModal() {
  $modalElement.classList.add('active');
  $overlayElement.classList.add('active');
}

export function displayCurrencyExchange(data) {
  clearResults();
  clearModal();
  setHeaderInfo(data);
  setCurrencyExchange(data);
  openModal();
}

const $backButton = document.querySelector('[data-button="back"]');

function hideModal() {
  $modalElement.classList.remove('active');
  $overlayElement.classList.remove('active');
}

function handleBackButton() {
  clearModal();
  hideModal();
}

$backButton.addEventListener('click', handleBackButton);
