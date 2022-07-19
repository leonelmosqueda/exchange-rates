const URL_API = "https://api.frankfurter.app";

let currencies;

const today = new Date();

const $form = document.querySelector("form[name='exchange-rates']");

const $convertButton = $form['btn-convert'];

async function setInitialSetup () {
    const currentDate = getCurrentDate(today);
    setCurrentDate(currentDate);
    setMaxDate(currentDate);
    currencies = await getData('/currencies');
    const options = createOptions(currencies);
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
    try {
        const response = await fetch(`${URL_API + endpoint}`);
        return response.json();
    } catch (e) {
        return console.error(e)
    }
}

function createOptions (currencies) {
    let options = [];

    Object.keys(currencies).forEach((symbol, index) => {
        const newOption = document.createElement('option');
        newOption.textContent = Object.values(currencies)[index];
        newOption.value = `${symbol}`;

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

    
    if (!toCurrency) return showAllCurrencyExchanges(data);

    showCurrencyExchange(data);
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

function showAllCurrencyExchanges(data) {
    clearResults();
    clearModal();
    setHeaderInformation(data);
    setCurrencyExchanges(data)
    openPopUp();
}

function openPopUp() {
    const modal = document.querySelector('#modal');
    const overlay = document.querySelector('#overlay');

    modal.classList.add('active');
    overlay.classList.add('active');
}

function setHeaderInformation(data) {
    const headerAmount = document.querySelector('#amount-header')
    const headerDate = document.querySelector('#date-header');

    headerAmount.textContent = `${data.amount} ${data.base}`;
    headerDate.textContent = `${data.date}`;
}

function setCurrencyExchanges(data) {
    const currenciesValue = Object.values(data.rates);
    const list = document.querySelector('#list');
    let increment = 0

    for (let i = 0; i < Object.keys(currencies).length - 1; i++) {
        if (Object.keys(currencies)[i] === data.base) {
            increment++;
        }
        
        const listItem = createListItem(currenciesValue[i], i, increment);
        list.appendChild(listItem);
    }
}

function createListItem(value, index, increment) {
    const element = document.createElement('li');
    element.textContent = `${value} ${Object.keys(currencies)[index + increment]} (${Object.values(currencies)[index + increment]})`;
    return element;
}

const backButton = document.querySelector('[data-button="back"]');

backButton.addEventListener('click', () => {
   clearModal();
   hideModal();
});

function clearModal() {
    const amountHeader = document.querySelector('#amount-header');
    const dateHeader = document.querySelector('#date-header');
    const listItems = document.querySelectorAll('#list li');
    
    amountHeader.textContent = "";
    dateHeader.textContent = "";

    listItems.forEach(listItem => {
        listItem.remove();
    })


}

function hideModal() {
    const modal = document.querySelector('#modal');
    const overlay = document.querySelector('#overlay');

    modal.classList.remove('active');
    overlay.classList.remove('active');
}

function showCurrencyExchange(data) {
    clearResults()
    setCurrencyExchange(data);
    showResults();
}

function setCurrencyExchange(data) {
    document.querySelector('[data-base="amount"]').textContent = data.amount;
    document.querySelector('[data-base="symbol"]').textContent = data.base;

    document.querySelector('[data-converted="value"]').textContent = Object.values(Object.values(data.rates));
    document.querySelector('[data-converted="symbol"]').textContent = Object.keys(data.rates);   
}

function showResults() {
    document.querySelector("#result").classList.remove('hidden');
}

function clearResults() {
    document.querySelector("#result").classList.add('hidden');
}

const swapButton = document.querySelector('[data-button="swap"]');

function swapCurrencies() {
    const from = $form['from-currency'];
    const to = $form['to-currency']; 
    let temp;

    temp = from.value;
    from.value = to.value;
    to.value = temp;
}

swapButton.addEventListener('click', swapCurrencies)

setInitialSetup();
