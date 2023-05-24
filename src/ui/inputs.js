import { validateAmount, validateDate, validateFromCurrency } from '../validations/validations.js';

const $form = document.querySelector('form[name="exchange-rates"]');
const $swapButton = document.querySelector('[data-button="swap"]');


export function setCurrentDate(date) {
  $form.date.value = date;
}

export function setMaxDate(date) {
  $form.date.max = date;
}

export function createOptionElements(optionsData) {
  return Object.keys(optionsData).map((symbol) => {
    const newOption = document.createElement('option');
    newOption.textContent = optionsData[symbol];
    newOption.value = symbol;
    return newOption;
  })
}

export function configureCurrencyOptions(options) {
  const $selectFrom = $form['from-currency'];
  const $selectTo = $form['to-currency'];

  options.forEach(option => {
    $selectFrom.appendChild(option);
    $selectTo.append(option.cloneNode(true));
  });
}

function removePreviousErrors() {
  const $errors = document.querySelectorAll('[data-error]');
  $errors.forEach($error => {
    $error.textContent = '';
  });
}

function highlightField(key) {
  const $element = $form[`${key}`];
  const $parentElement = $element.parentElement;

  $element.classList.add('error');
  $parentElement.classList.add('error');
}

function removeHighlightedField(key) {
  const $element = $form[`${key}`];
  const $parentElement = $element.parentElement;

  $element.classList.remove('error');
  $parentElement.classList.remove('error');
}

function handleErrors(errors) {
  let errorCounter = 0;
  const keys = Object.keys(errors);

  keys.forEach(key => {
    const error = errors[key];
    const $error = document.querySelector(`[data-error="${key}"]`);

    if(error) {
      errorCounter += 1;
      $error.textContent = error;
      highlightField(key);
    } else {
      $error.textContent = '';
      removeHighlightedField(key);
    }
  });

  return errorCounter;
}
   
export function validateForm() {
  removePreviousErrors();
  const $fromCurrency = $form['from-currency'].value;
  const $amount = $form.amount.value;
  const $date = $form.date.value;

  const errorFromCurrency = validateFromCurrency($fromCurrency);
  const errorAmount = validateAmount($amount);
  const errorDate = validateDate($date);

  const errors = {
    'from-currency': errorFromCurrency,
    amount: errorAmount,
    date: errorDate
  };

  return handleErrors(errors) === 0;
}

function swapCurrencies() {
  const $from = $form['from-currency'];
  const $to = $form['to-currency']; 
  let $temp;

  $temp = $from.value;
  $from.value = $to.value;
  $to.value = $temp;
}

$swapButton.addEventListener('click', swapCurrencies);
