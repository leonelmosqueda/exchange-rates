const URL_API = "https://api.frankfurter.app";

let currenciesSymbol;
let currenciesName;

const today = new Date();

const $inputDate = document.querySelector('#date');
const $selectFrom = document.querySelector('#from-currency');
const $selectTo = document.querySelector('#to-currency');

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
    $inputDate.value = date;
}

function setMaxDate (date) {
    $inputDate.max = date;
}

function getData(endpoint) {
    return fetch(`${URL_API + endpoint}`)
                .then(response => response.json());
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
    options.forEach(option => {
        $selectFrom.appendChild(option.cloneNode(true));
        $selectTo.appendChild(option);
    });
}

setInitialSetup();