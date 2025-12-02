const dropdowns = document.querySelectorAll(".dropdown select");
let selectFrom = document.querySelector(".from select");
let selectTo = document.querySelector(".to select");
let btn = document.querySelector("button");
let textBox =  document.querySelector("form input");
let swapImg = document.querySelector("#swap-img");
let fromFlag = document.querySelector("#from-flag");
let toFlag = document.querySelector("#to-flag");
let msg = document.querySelector(".msg");

async function updateExchangeRate(){
    if(textBox.value === "" || textBox.value < 0 || Number.isNaN(Number(textBox.value))){
        textBox.value = 1;
    } 
    console.log(Number(textBox.value));
    console.log("Amount : " + textBox.value);
    let fromCurrencyCode = selectFrom.value;
    let toCurrencyCode = selectTo.value;
    console.log("From : " + fromCurrencyCode);
    console.log("To : " + toCurrencyCode);  
    const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrencyCode.toLowerCase()}.json`);
    console.log(response);
    const data = await response.json();
    console.log(data);
    let exchangeRate = data[fromCurrencyCode.toLowerCase()][toCurrencyCode.toLowerCase()];
    console.log("Exchange Rate = " + exchangeRate);
    let finalAmount = textBox.value * exchangeRate;
    console.log("Final Amount = " + finalAmount);
    msg.innerHTML = `${Number(textBox.value).toFixed(2)} ${fromCurrencyCode} = <b>${finalAmount.toFixed(2)}</b> ${toCurrencyCode}`;
}

for(select of dropdowns){
    for(currencyCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currencyCode;
        newOption.setAttribute("value", currencyCode);
        if(select.name === "from" && currencyCode === "USD"){ 
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currencyCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);

    }
    select.addEventListener("change", (e)=>{
        console.log(e.target.name + " flag changed");
        updateFlag(e);
    });
}

const updateFlag = (e)=>{
    let newCurrencyCode = e.target.value;
    let newFlag = countryList[newCurrencyCode];
    console.log(newFlag);
    let imgElement = e.target.parentElement.querySelector("img");
    imgElement.src = `https://flagsapi.com/${newFlag}/flat/64.png`
}

btn.addEventListener("click", (e)=>{
    //event object has a method called preventDefault() that tells the browser 
    //to not execute the default behavoir of btn when the event "click" has been triggered.
    e.preventDefault();
    updateExchangeRate();
});


swapImg.addEventListener("click", (e)=>{
    [selectFrom.value, selectTo.value] = [selectTo.value, selectFrom.value];
    [fromFlag.src, toFlag.src] = [toFlag.src, fromFlag.src];
    updateExchangeRate();
});
 
window.addEventListener("load",()=>{
    updateExchangeRate();
});


 