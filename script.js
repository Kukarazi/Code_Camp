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
  { id: "cny", symbol: "¥", emoji: "🇨🇳" },
];

const EXCHANGE_RATES = {
  usd: {
    rub: 60.2,
    gbp: 0.84,
    trl: 18.11,
    cny: 6.583,
  },
  rub: {
    usd: 0.016,
    gbp: 0.013,
    trl: 0.3,
    cny: 0.11,
  },
  gbp: {
    usd: 2.18,
    rub: 71.46,
    trl: 21.5,
    cny: 8.15,
  },
  trl: {
    usd: 0.055,
    rub: 3.32,
    gbp: 0.046,
    cny: 5.37,
  },
  cny: {
    usd: 0.14,
    rub: 8.83,
    gbp: 2.12,
    trl: 2.65,
  },
};

function render() {
  const amount = amountInput.valueAsNumber;
  const from = currenciesInput.value;
  output.innerHTML = "";
  CURRENCIES.forEach((to) => {
    if (to.id != from) {
      const res = convert(amount, from, to.id).toFixed(1);
      output.innerHTML += `<li> ${to.symbol} ${res} ${to.emoji} <br/>`;
    }
  });
}

function convert(amount, from, to) {
  // add a meaningfull comment
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
