export const today = new Date();

export function getCurrentDate() {
  return `${today.getFullYear()}-${(today.getMonth()+1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
}

export function getInputValues() {
  const fromCurrency = document.querySelector('#from-currency').value;
  const toCurrency = document.querySelector('#to-currency').value;
  const amount = document.querySelector('#amount').value;
  const date = document.querySelector('#date').value;

  return { fromCurrency, toCurrency, amount, date };
}

export function getEndpoint(from, to, amount, date) {
  if (!to) return `/${date}?from=${from}&amount=${amount}`;

  return `/${date}?from=${from}&to=${to}&amount=${amount}`;
}