const URL_BASE = 'https://api.frankfurter.app';

export async function fetchCurrencies() {
  const apiUrl = `${URL_BASE}/currencies`;
  const response = await fetch(apiUrl);
  return response.json();
}

export async function fetchRates(endpoint) {
  const apiUrl = `${URL_BASE}${endpoint}`;
  const response = await fetch(apiUrl);
  return response.json();
}
