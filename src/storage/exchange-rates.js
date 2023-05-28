export function fetchCurrencies() {
  const currenciesData = JSON.parse(localStorage.getItem('currencies'));

  if (currenciesData === null) {
    throw new Error('Currencies data not found in localStorage');
  }

  return currenciesData;
}

export function saveCurrencies (currencies) {
  if(typeof currencies !== 'object') {
    throw new Error('Currencies is needed');
  }

  localStorage.setItem('currencies', JSON.stringify(currencies));
}

export function fetchRates(key) {
  const ratesData = JSON.parse(localStorage.getItem(key));

  if (ratesData === null) {
    throw new Error('Rates data not found in localStorage');
  }

  return ratesData.rates;
}

export function saveRates(key, rates) {
  if (typeof rates !== 'object') {
    throw new Error('Rates is needed');
  }

  const ratesData = {
    key,
    rates
  }

  localStorage.setItem(key, JSON.stringify(ratesData));
}
