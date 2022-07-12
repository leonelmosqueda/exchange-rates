const URL_API = "https://api.frankfurter.app";

let currenciesSymbol;
let currenciesName;

const today = new Date();

const $form = document.querySelector("form[name='exchange-rates']");

const $convertButton = $form['btn-convert'];

async function setInitialSetup () {
    const currentDate = getCurrentDate(today);
    setCurrentDate(currentDate);
    setMaxDate(currentDate);
    const currencies = await getData('/currencies');
    getCurrenciesSymbol(currencies);
    getCurrenciesName(currencies);
    const options = createOptions(currenciesName, currenciesSymbol);
    setOptions(options);
}

function getCurrentDate () {
    return date = `${today.getFullYear()}-${(today.getMonth()+1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
}

function setCurrentDate (date) {
    const $date = $form.date;
    $date.value = date;
}

function setMaxDate (date) {
    const $date = $form.date;
    $date.max = date;
}

async function getData(endpoint) {
    const response = await fetch(`${URL_API + endpoint}`);
    return await response.json();
}

function getCurrenciesSymbol(object) {
    return currenciesSymbol = Object.keys(object);
}

function getCurrenciesName (object) {
    return currenciesName = Object.values(object);
}

function createOptions (names, symbols) {
    let options = [];

    names.forEach((name, index) => {
        const newOption = document.createElement('option');
        newOption.textContent = name
        newOption.value = `${symbols[index]}`;

        options.push(newOption);
    });

    return options;
}

function setOptions (options) {
    const $selectFrom = $form['from-currency'];
    const $selectTo = $form['to-currency'];

    options.forEach(option => {
        $selectFrom.appendChild(option.cloneNode(true));
        $selectTo.appendChild(option);
    });
}

$convertButton.addEventListener('click', async event => {
    event.preventDefault();
    if (!validateForm()) return;

    const fromCurrency = $form['from-currency'].value;
    const toCurrency = $form['to-currency'].value;
    const amount = $form.amount.value;
    const date = $form.date.value;

    const endpoint = getEndpoint(date, fromCurrency, toCurrency, amount);

    const data = await getData(endpoint);
});

function validateForm() {
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
    }

    return handleErrors(errors) === 0;
}

function removePreviousErrors() {
    const $errors = document.querySelectorAll(`[data-error]`);
    $errors.forEach(error => {
        error.textContent = '';
    });
}

function handleErrors(errors) {
    let errorCounter = 0;
    const keys = Object.keys(errors);

    keys.forEach(key => {
        const error = errors[key]
        const $error = document.querySelector(`[data-error="${key}"]`);
        
        if (error) {
            errorCounter++;
            $error.textContent = error;
            highlightField(key)
        } else {
            $error.textContent = '';
            removeHighlightedField(key);
        }
    });
    
    return errorCounter;
}

function highlightField (key) {
    const element = $form[`${key}`];
    const parentElement = element.parentElement;

    element.classList.add('error');
    parentElement.classList.add('error');
}

function removeHighlightedField(key) {
    const element = $form[`${key}`];
    const parentElement = element.parentElement;

    element.classList.remove('error');
    parentElement.classList.remove('error');
}

function getEndpoint(date, from, to, amount) {
    if (!to) return `/${date}?from=${from}&amount=${amount}`;

    return `/${date}?from=${from}&to=${to}&amount=${amount}`;
}

setInitialSetup();