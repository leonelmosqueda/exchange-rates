const URL_API = 'https://api.frankfurter.app';

export async function fetchCurrencies() {
  const url = `${URL_API}/currencies`;
  const response = await fetch(url);
  return response.json();
}

export async function fetchRates(endpoint) {
  const url = `${URL_API}${endpoint}`;
  const response = await fetch(url);
  return response.json();
}
