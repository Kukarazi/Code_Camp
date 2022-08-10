let currenciesInput = document.getElementById("currencies");
let amountInput = document.getElementById("amount");
let output = document.getElementById("outputbox");

amountInput.addEventListener("input", render);
currenciesInput.addEventListener("input", render);

const CURRENCIES = [
  { id: "usd", symbol: "$", emoji: "💰" },
  { id: "rub", symbol: "₽", emoji: "🪆" },
  { id: "gbp", symbol: "£", emoji: "💂‍♀️" },
  { id: "trl", symbol: "₺", emoji: "🦃" },
];

const EXCHANGE_RATES = {
  usd: {
    rub: 60.48,
    gbp: 0.83,
    trl: 17.91,
  },
  rub: {
    usd: 0.017,
    gbp: 0.014,
    trl: 0.3,
  },
  gbp: {
    usd: 1.21,
    rub: 73.04,
    trl: 21.63,
  },
  trl: {
    usd: 0.056,
    rub: 3.38,
    gbp: 0.046,
  },
};

function render() {
  const amount = amountInput.valueAsNumber;
  const from = currenciesInput.value;
  output.innerHTML = "";
  CURRENCIES.forEach((to) => {
    if (to.id != from) {
      const res = convert(amount, from, to.id).toFixed(1);
      output.innerHTML += `${to.symbol} ${res} ${to.emoji} <br/>`;
    }
  });
}

function convert(amount, from, to) {
  return amount * EXCHANGE_RATES[from][to];
}

function initialState() {
  CURRENCIES.forEach((currency) => {
    var currencyOption = document.createElement("option");
    currencyOption.text = `${currency.symbol} ${currency.emoji}`;
    currencyOption.value = currency.id;
    currenciesInput.add(currencyOption);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initialState();
  render();
});
