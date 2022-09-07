let currenciesInput = document.getElementById("currencies");
let amountInput = document.getElementById("amount");
let output = document.getElementById("outputbox");

amountInput.addEventListener("input", render);
currenciesInput.addEventListener("input", render);

let EXCHANGE_RATES = undefined;

const CURRENCIES = ["USD", "RUB", "TRY", "BOB", "UZS", "EUR"];

function render() {
  const amount = amountInput.valueAsNumber;
  const from = currenciesInput.value;
  output.innerHTML = "";
  CURRENCIES.forEach((to) => {
    if (to != from) {
      const res = convert(amount, from, to).toFixed(1);
      output.innerHTML += `<li> ${to} ${res} <br/>`;
    }
  });
}

function convert(amount, from, to) {
  return (amount * EXCHANGE_RATES[to]) / EXCHANGE_RATES[from];
}

function initialState() {
  fetch("https://open.exchangerate-api.com/v6/latest")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      EXCHANGE_RATES = data.rates;
      CURRENCIES.forEach((currency) => {
        var currencyOption = document.createElement("option");
        currencyOption.text = `${currency}`;
        currencyOption.value = `${currency}`;
        currenciesInput.add(currencyOption);
      });
      render();
    });
}

document.addEventListener("DOMContentLoaded", function () {
  initialState();
  render();
});
