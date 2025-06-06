const dropList = document.querySelectorAll(".drop-list select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");

  if (localStorage.getItem('isLoggedIn') !== 'true') {
      window.location.href = 'login.html';
    }
 for(let i = 0;i < dropList.length;i++){
    for(currency_code in country_code)
    {
        //mengatur default menjadi ID dan USD
        let selected = "";
        if (i === 0 && currency_code === "USD") {
            selected = "selected";
        } else if (i === 1 && currency_code === "IDR") {
            selected = "selected";
        }
        // console.log(currency_code);
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e =>{
        loadFlag(e.target);
    });
 }

 function loadFlag(element){
  for(code in country_code){
    if (code == element.value){
        let imgTag = element.parentElement.querySelector("img");
        imgTag.src=`https://flagsapi.com/${country_code[code]}/flat/64.png`
    }
  }
 }

 window.addEventListener("load",()=>{
    // getExchangeRate();
    displayHistory();
 });

getButton.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRate(true); 
});

 
const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener('click',()=>{
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate(false); // Panggil getExchangeRate tanpa menyimpan data
})

function saveToHistory(amount, fromCurrency, toCurrency, totalExchangeRate) {
    let history = JSON.parse(localStorage.getItem('conversionHistory')) || [];
    const conversion = {
        amount,
        fromCurrency,
        toCurrency,
        totalExchangeRate,
        date: new Date().toLocaleString()
    };
    history.push(conversion);
    localStorage.setItem('conversionHistory', JSON.stringify(history));
    displayHistory();
}

function displayHistory() {
    const historyList = document.getElementById('history-list');
    const clearHistoryButton = document.getElementById('clear-history');
    historyList.innerHTML = '';
    let history = JSON.parse(localStorage.getItem('conversionHistory')) || [];
    
    if (history.length === 0) {
        clearHistoryButton.style.display = 'none';
    } else {
        clearHistoryButton.style.display = 'block';
    }

    history.forEach(conversion => {
        const listItem = document.createElement('li');
        listItem.textContent = `${conversion.date}: ${conversion.amount} ${conversion.fromCurrency} = ${conversion.totalExchangeRate} ${conversion.toCurrency}`;
        historyList.appendChild(listItem);
    });
}

document.getElementById('clear-history').addEventListener('click', clearHistory);

function clearHistory() {
    localStorage.removeItem('conversionHistory');
    displayHistory();
}

function getExchangeRate(saveToHistoryFlag = true) {
    const amount = document.querySelector(".amount input");
    exchangeRateTxt = document.querySelector(".exchange-rate");
    //atur default value 1 di field input
    let amountVal = amount.value;
    if (amountVal == "" || amountVal == "0") {
        amount.value = "1";
        amountVal = 1;
    }
    let url = `https://v6.exchangerate-api.com/v6/${EXCHANGE_API_KEY}/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value];
        // console.log(exchangeRate);
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
        console.log(totalExchangeRate);
        const exchangeRateTxt = document.querySelector(".exchange-rate");
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
        
        if (saveToHistoryFlag) {
            saveToHistory(amountVal, fromCurrency.value, toCurrency.value, totalExchangeRate);
        }
    });
}

function Logout(){
          localStorage.removeItem('isLoggedIn');
      window.location.href = 'login.html';
}

