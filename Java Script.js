const selectFrom = document.querySelector(".From select");
const selectTo = document.querySelector(".To select");
const button = document.querySelector(".button");
const BASE_URL = "https://api.exchangerate-api.com/v4/latest";
const swapIcon = document.querySelector(".fa-solid");

let message = document.querySelector(".conversionRate");

for (const key in countryList) {
    let option = document.createElement("option");
    option.innerText = key;
    option.value = key;
    selectFrom.append(option);
    if (key == "USD") {
        option.selected = true;
    }
}

for (const key in countryList) {
    let option = document.createElement("option");
    option.innerText = key;
    option.value = key;
    selectTo.append(option);
    if (key == "PKR") {
        option.selected = true;
    }
}

function changeFlag() {
    const fromCode = selectFrom.value;
    const toCode = selectTo.value;

    let fromFlagImage = document.querySelector(".From img");
    let toFlagImage = document.querySelector(".To img");

    fromFlagImage.src = `https://flagsapi.com/${countryList[fromCode]}/flat/64.png`;
    toFlagImage.src = `https://flagsapi.com/${countryList[toCode]}/flat/64.png`;
}

selectFrom.addEventListener("change", changeFlag);
selectTo.addEventListener("change", changeFlag);

button.addEventListener("click", async (eventObject) => {
    eventObject.preventDefault();

    let amountTag = document.querySelector(".form input");
    let amount = amountTag.value;
    let num = parseInt(amount, 10);
    if (num < 1 || num == "" || isNaN(num)) {
        alert("Please! Enter Valid Number || Positive.");
        amountTag.value = "1";
        return;
    }

    let fromValue = selectFrom.value;
    let toValue = selectTo.value;


    const fullURL = `${BASE_URL}/${fromValue}`;

    const response = await fetch(fullURL);
    // console.log(response);

    const data = await response.json();
    // console.log(data);

    // console.log(data.rates);
    
    const conversionRate = data.rates[toValue];
    // console.log(data.rates[toValue]);

    const convertedAmount = (num * conversionRate).toFixed(2);

    // console.log(convertedAmount);
    // Yes, exactly. The toFixed(n) method converts the number into a string and represents n digits after the decimal point, where n can be any non-negative integer. Here's a breakdown of how toFixed(n) works:
    // n = 0: No digits after the decimal point.
    // n = 1: One digit after the decimal point.
    // n = 2: Two digits after the decimal point.
    // And so on...

    message.innerText = `Conversion Rate: 1 ${fromValue} = ${conversionRate} ${toValue}, ${num} ${fromValue} = ${convertedAmount} ${toValue}`;
});

swapIcon.addEventListener("click", () => {
    const fromValue = selectFrom.value;
    const toValue = selectTo.value;

    selectFrom.value = toValue;
    selectTo.value = fromValue;

    changeFlag();
});

