const urlUSD = "https://v6.exchangerate-api.com/v6/f8b9170359669b98025f951c/latest/USD "
const urlEUR = "https://v6.exchangerate-api.com/v6/f8b9170359669b98025f951c/latest/EUR "
const urlRUB = "https://v6.exchangerate-api.com/v6/f8b9170359669b98025f951c/latest/RUB "
const urlGBP = "https://v6.exchangerate-api.com/v6/f8b9170359669b98025f951c/latest/GBP "
rates = {
    USD: {},
    EUR: {},
    RUB: {},
    GBP: {},
};
let no=document.querySelector(".no")
window.addEventListener('offline', () => {
   no.style.display="block"
});

fetch(urlUSD)
    .then(response => response.json())
    .then(data => { rates.USD = data.conversion_rates; })
    .catch(error => console.log(error.message))
fetch(urlEUR)
    .then(response => response.json())
    .then(data => { rates.EUR = data.conversion_rates; })
    .catch(error => console.log(error.message))
fetch(urlRUB)
    .then(response => response.json())
    .then(data => { rates.RUB = data.conversion_rates; })
    .catch(error => console.log(error.message))
fetch(urlGBP)
    .then(response => response.json())
    .then(data => { rates.GBP = data.conversion_rates; })
    .catch(error => console.log(error.message))
let fromCurrency = "RUB"
let toCurrency = "USD"
let fromButtons = document.querySelectorAll(".fromCurrency button")
let toButtons = document.querySelectorAll(".toCurrency button")
let fromExchange = document.querySelector(".fromRectangle .exchange")
let toExchange = document.querySelector(".toRectangle .exchange")
let fromAmount = document.querySelector(".fromRectangle input")
let toAmount = document.querySelector(".toRectangle input")
fromButtons.forEach(button => {
    button.addEventListener("click", () => {
        fromButtons.forEach(btn => btn.classList.remove("active"))
        button.classList.add("active");
        fromCurrency = button.textContent.trim();
        console.log("From Currency: ", fromCurrency);
        performConversion();
    });
});
toButtons.forEach(button => {
    button.addEventListener("click", () => {
        toButtons.forEach(btn => btn.classList.remove("active"))
        button.classList.add("active");
        toCurrency = button.textContent.trim();
        console.log("To Currency: ", toCurrency);
        performConversion();
    });
});
fromAmount.addEventListener("input",()=>{
    inputDetails("input")
    performConversion("input")
})
toAmount.addEventListener("input",()=>{
    inputDetails("output")
    performConversion("output")
})
function inputDetails(direction) {
    if (direction === "input") {
        fromAmount.value = fromAmount.value.replace(/[^0-9.,]/g, "");
        fromAmount.value = fromAmount.value.replace(/,/g, ".");
        if (fromAmount.value.startsWith(".")) {
            fromAmount.value = "";
        }
        if (fromAmount.value.includes(".")) {
            let parts = fromAmount.value.split(".");
            fromAmount.value = parts[0] + "." + parts[1].substring(0, 5);
        }
    }

    if (direction === "output") {
        toAmount.value = toAmount.value.replace(/[^0-9.,]/g, "");
        toAmount.value = toAmount.value.replace(/,/g, "."); 
        if (toAmount.value.startsWith(".")) {
            toAmount.value = "";
        }
        if (toAmount.value.includes(".")) {
            let parts = toAmount.value.split(".");
            toAmount.value = parts[0] + "." + parts[1].substring(0, 5);
        }
    }
}

function performConversion(direction) {
    if (direction === "input") {
        if (fromAmount.value === "") {
            toAmount.value = "";
        } else {
            let to = fromAmount.value * rates[fromCurrency][toCurrency];
            toAmount.value = Number.isInteger(to) ? to : to.toFixed(5);
        }
    } else if (direction === "output") {
        if (toAmount.value === "") {
            fromAmount.value = "";
        } else {
            let from = toAmount.value * rates[toCurrency][fromCurrency];
            fromAmount.value = Number.isInteger(from) ? from : from.toFixed(5);
        }
    }

    fromExchange.value = `1 ${fromCurrency}=${rates[fromCurrency][toCurrency]} ${toCurrency}`
    toExchange.value = `1 ${toCurrency}=${rates[toCurrency][fromCurrency]} ${fromCurrency}`
    console.log("Performing conversion for", fromCurrency, "to", toCurrency);
}

