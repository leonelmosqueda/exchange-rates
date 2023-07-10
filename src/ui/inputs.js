import { validateAmount, validateDate, validateFromCurrency } from '../validations/validations.js';

const $form = document.querySelector('form[name="exchange-rates"]');
const $swapButton = document.querySelector('[data-button="swap"]');


export function setCurrentDate(date) {
  $form.date.value = date;
}

export function setMaxDate(date) {
  $form.date.max = date;
}

/**
 * @param {object} optionsData - The data used to generate option elements.
 * @return {array} An array of option elements.
 */

export function createOptions(optionsData) {
  return optionsData.names.map((name, index) => {
    const optionElement = document.createElement('option');
    optionElement.textContent = name;
    optionElement.value = optionsData.codes[index];
    return optionElement;
  });
}

export function configureCurrencyOptions(options) {
  const $fromCurrencySelect = document.querySelector('#from-currency');
  const $toCurrencySelect = document.querySelector('#to-currency');

  options.forEach(option => {
    $fromCurrencySelect.appendChild(option);
    $toCurrencySelect.appendChild(option.cloneNode(true));
  });
}

function removePreviousErrors() {
  const $errorElements = document.querySelectorAll('[data-error]');
  $errorElements.forEach(element => {
    element.textContent = '';
  });
}

function highlightField(fieldName) {
  const $fieldElement = $form[fieldName];
  const $parentElement = $fieldElement.parentElement;

  $fieldElement.classList.add('error');
  $parentElement.classList.add('error');
}

function removeHighlightedField(key) {
  const $fieldElement = $form[`${key}`];
  const $parentElement = $fieldElement.parentElement;

  $fieldElement.classList.remove('error');
  $parentElement.classList.remove('error');
}

function handleErrors(errors) {
  let errorCounter = 0;
  const errorKeys = Object.keys(errors);

  errorKeys.forEach(key => {
    const error = errors[key];
    const $errorElement = document.querySelector(`[data-error="${key}"]`);

    if (error) {
      errorCounter++;
      $errorElement.textContent = error;
      highlightField(key);
    } else {
      $errorElement.textContent = '';
      removeHighlightedField(key);
    }
  });

  return errorCounter;
}
   
export function isFormValid() {
  removePreviousErrors();

  const fromCurrency = $form['from-currency'].value;
  const amount = $form.amount.value;
  const date = $form.date.value;

  const errorFromCurrency = validateFromCurrency(fromCurrency);
  const errorAmount = validateAmount(amount);
  const errorDate = validateDate(date);

  const errors = {
    'from-currency': errorFromCurrency,
    amount: errorAmount,
    date: errorDate
  };

  return handleErrors(errors) === 0;
}

function swapCurrencies() {
  const $fromCurrencyInput = $form['from-currency'];
  const $toCurrencyInput = $form['to-currency'];
  let temp;

  temp = $fromCurrencyInput.value;
  $fromCurrencyInput.value = $toCurrencyInput.value;
  $toCurrencyInput.value = temp;
}

$swapButton.addEventListener('click', swapCurrencies);
