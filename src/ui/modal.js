import { currencies } from '../exchange-rates.js';

const $modal = document.querySelector('#modal');
const $overlay = document.querySelector('#overlay');
const $amountHeader = document.querySelector('#amount-header');
const $dateHeader = document.querySelector('#date-header');
const $list = document.querySelector('#list');

function clearResults() {
  document.querySelector('#result').classList.add('hidden');
}

function clearModal() {
  const $listItems = $list.querySelectorAll('li');

  $amountHeader.textContent = '';
  $dateHeader.textContent = '';
  $listItems.forEach((item) => item.remove());
}

function setHeaderInformation(data) {
  $amountHeader.textContent = `${data.amount} ${data.base}`;
  $dateHeader.textContent = `${data.date}`;
}

function createListItem(value, index, increment) {
  const listItem = document.createElement('li');
  listItem.textContent = `${value} ${Object.keys(currencies)[index + increment]} (${Object.values(currencies)[index + increment]})`;
  return listItem;
}

function setCurrencyExchanges(data) {
  const currencyValues = Object.values(data.rates);
  let increment = 0;

  for(let i = 0; i < Object.keys(currencies).length - 1; i += 1) {
    if(Object.keys(currencies)[i] === data.base) {
      increment += 1
    };

    const listItem = createListItem(currencyValues[i], i, increment);
    $list.appendChild(listItem)
  }
}

function openModal() {
  $modal.classList.add('active');
  $overlay.classList.add('active');
}

export function showAllCurrencyExchanges(data) {
  clearResults();
  clearModal();
  setHeaderInformation(data);
  setCurrencyExchanges(data);
  openModal();
}

const $backButton = document.querySelector('[data-button="back"]');

function hideModal() {
  $modal.classList.remove('active');
  $overlay.classList.remove('active');
}

function handleBackButton() {
  clearModal();
  hideModal();
}

$backButton.addEventListener('click', handleBackButton);
