/**
 * Fetches the currencies data from the localStorage.
 *
 * @return {Object} The currencies data.
 * @throws {Error} If the currencies data is not found in localStorage.
 */
export function fetchCurrencies() {
  const currenciesData = JSON.parse(localStorage.getItem('currencies'));

  if (!currenciesData) {
    throw new Error('Currencies data not found in localStorage');
  }

  return currenciesData;
}

/**
 * Saves the provided currencies to local storage.
 *
 * @param {object} currencies - The currencies to be saved.
 * @throws {Error} Throws an error if currencies is not an object.
 */
export function saveCurrencies (currencies) {
  if (typeof currencies !== 'object') {
    throw new Error('Currencies must be an object');
  }

  localStorage.setItem('currencies', JSON.stringify(currencies));
}

/**
 * Fetches rates using the provided key from localStorage.
 *
 * @param {string} key - The key used to fetch rates from localStorage.
 * @throws {Error} Throws an error if rates data is not found in localStorage.
 * @return {object} The rates data fetched from localStorage.
 */
export function fetchRates(key) {
  const ratesData = JSON.parse(localStorage.getItem(key));

  if (!ratesData) {
    throw new Error('Rates data not found in localStorage');
  }

  return ratesData.rates;
}

/**
 * Saves the rates data to the local storage.
 *
 * @param {string} key - The key used to store the rates data.
 * @param {object} rates - The rates data to be saved.
 * @throws {Error} If the rates parameter is not an object.
 */
export function saveRates(key, rates) {
  if (typeof rates !== 'object') {
    throw new Error('Rates object is required');
  }

  const ratesData = { key, rates };

  localStorage.setItem(key, JSON.stringify(ratesData));
}
